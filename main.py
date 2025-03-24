from fastapi import FastAPI, Query
import requests

app = FastAPI()

WEATHER_API_KEY = "your_openweathermap_api_key"
BASE_URL = "https://api.openweathermap.org/data/2.5/onecall"

@app.get("/weather")
def get_weather(lat: float = Query(...), lon: float = Query(...)):
    params = {
        "lat": lat, 
        "lon": lon, 
        "appid": WEATHER_API_KEY, 
        "units": "metric", 
        "exclude": "minutely,hourly"
    }
    response = requests.get(BASE_URL, params=params)
    return response.json()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000, reload=True)
