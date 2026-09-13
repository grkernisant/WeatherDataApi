# Introduction
This project uses the openweathermap.org API to retrieve weather data for a requested city.

In order not to exceed the rate limit of our Api Key we can configure the amount of calls per minute allowed in our environment variables.
The city and weather data is then cached in our local database to prevent exhausting our api call limit prematuraly.

# Weather Data Api Call Flow
```mermaid
sequenceDiagram
    autonumber
    actor Client
    participant API as Your API (/weather/city/:city)
    participant DB as Postgres DB
    participant GeoAPI as OpenWeather Geocoding API
    participant WeatherAPI as OpenWeather Weather API

    Note over Client, API: Request starts

    Client->>API: GET /weather/city/London
    API->>DB: Query coordinates for "London"

    alt Coordinates found in DB
        DB-->>API: Return {lat, lon}
    else Coordinates NOT found
        API->>GeoAPI: Direct Geocoding for "London"
        GeoAPI-->>API: Return [{lat, lon}, ...]
        API->>DB: Store "London" coordinates {lat, lon}
    end

    Note over API: Now we have {lat, lon}

    API->>DB: Query weather for {lat, lon}

    alt Weather found AND timestamp < 1 hour old
        DB-->>API: Return cached weather data
    else Weather NOT found OR data is > 1 hour old
        API->>WeatherAPI: Get current weather for {lat, lon}
        WeatherAPI-->>API: Return current weather data
        API->>DB: Upsert current weather for {lat, lon} with current timestamp
    end

    API-->>Client: Return final weather data
    Note over Client, API: Request complete
```