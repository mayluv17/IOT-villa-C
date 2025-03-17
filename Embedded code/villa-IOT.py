from machine import ADC, Pin
from utime import sleep
import network
import urequests as requests


# Configuration
WIFI_SSID = "OnePlus Nord CE 2 Lite 5G"  # can be modify for the wokwi 
WIFI_PASS = "1122334400"                 #   can be modified 
BASE_URL = "https://happyplants-lyart.vercel.app"    # can be modified 
DEBUG = True                                  


# Definin GPIO pins 
MOISTURE_SENSOR_PIN = 26
PIR_PIN = 22
DHT_PIN = 28
TRIG_PIN = 5
ECHO_PIN = 6

# Moisture Calibration Values
DRY_VALUE = 60000  # Dry sensor value
WET_VALUE = 2000   # Wet sensor value
THRESHOLD_PERCENT = 5  # Irrigation threshold

# Initialize Components
moisture_sensor = ADC(Pin(MOISTURE_SENSOR_PIN))
pir_sensor = ADC(Pin(PIR_PIN))
dht_sensor = ADC(Pin(DHT_PIN))
distance_sensor = ADC(Pin(TRIG_PIN,ECHO_PIN))

def debug_log(message):
    """Log debug messages if DEBUG is enabled."""
    if DEBUG:
        print(message)


# Wi-Fi configuration. 
def connect_wifi():
    """Connect to Wi-Fi."""
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    debug_log("Connecting to Wi-Fi...")
    wlan.connect(WIFI_SSID, WIFI_PASS)
    
    while not wlan.isconnected():
        print(".", end="")
        sleep(0.5)
    
    print("\nWi-Fi connected!")
    debug_log(f"Network Config: {wlan.ifconfig()}")
    return wlan

def read_moisture():
    """Read the moisture level from the sensor and convert it to percentage."""
    raw_value = moisture_sensor.read_u16()
    if raw_value > DRY_VALUE:
        raw_value = DRY_VALUE
    elif raw_value < WET_VALUE:
        raw_value = WET_VALUE

    # Convert raw value to percentage
    moisture_percent = 100 - ((raw_value - WET_VALUE) / (DRY_VALUE - WET_VALUE) * 100)
    return moisture_percent

# Function to read temperature
def read_temperature():
    dht_sensor.measure()  # Perform measurement
    temperature = dht_sensor.temperature()  # Read temperature
    return temperature

def measure_distance():
    # Trigger pulse
    TRIG_PIN.low()
    utime.sleep_us(2)
    TRIG_PIN.high()
    utime.sleep_us(5)
    TRIG_PIN.low()
# Measure echo pulse duration
    pulse_duration = machine.time_pulse_us(echo_pin, 1, 1000000)  # Timeout of 1 second (1,000,000 microseconds)
    
    # Calculate distance in centimeters
    distance_cm = (pulse_duration * 0.0343) / 2
    
    return distance_cm

def send_data(moisture_before, wood_level, lake_temperature):
    """Send data to the API."""
    try:
        query_params = f"?moistureBefore={moisture_before}&woodlevel={wood_level}&laketemperature={lake_temperature}"
        request_url = f"{BASE_URL}/api/moisture{query_params}"
        debug_log(f"Sending data to: {request_url}")
        
        response = requests.get(request_url)
        debug_log(f"Response Status Code: {response.status_code}")
        debug_log(f"Response Content: {response.content}")
    except Exception as e:
        debug_log(f"Error sending data: {e}")



def monitor_sensor():
    connect_wifi()
# Main loop
    while True:
        moisture_before = read_moisture()
        wood_level = measure_distance()
        lake_temperature = read_moisture()
        debug_log(f"Moisture Level Before leakage: {moisture_before:.2f}%")

    #if the moisture is below threshold, do nothing 
        if moisture_before > THRESHOLD_PERCENT:
            print("PIPE LEAKAGE DETECTED")
    
        else:
            #send current moiture reading when threshod not atain
            send_data(moisture_before, wood_level, lake_temperature)

        
    


    else:

    if pir_pin.value() == 1:
        led_motion.on()  # Turn on LED if motion is detected
        print("Motion detected")
    else:
        led_motion.off()  # Turn off led if no motion detected
        print("No motion")

    temperature = read_temperature()
    if temperature is not None:
        print(f"Temperature: {temperature}°C")
        if temperature < -15:
            led_temperature.on()
        else:
            led_temperature.off()

    distance = measure_distance()
    print(f"Distance: {distance} cm")
    if distance > 100:
        led_pin.on()
    else:
        led_pin.off()

    utime.sleep(0.5)  # Adjust sleep time as needed
