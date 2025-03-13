from machine import ADC, Pin
from utime import sleep
import network
import urequests as requests


# Configuration
WIFI_SSID = "OnePlus Nord CE 2 Lite 5G"  # can be modify for the wokwi 
WIFI_PASS = "1122334400"                 #   can be modified 
BASE_URL = "https://happyplants-lyart.vercel.app"    # can be modified 
DEBUG = False                                  # can be modified 


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

# Define GPIO pins
potentiometer_pin = machine.ADC(26)  # Potentiometer connected to GP26
led_water = machine.Pin(20, machine.Pin.OUT)  # Red LED connected to GP20
pir_pin = machine.Pin(22, machine.Pin.IN)   # PIR motion sensor output (GP22)
led_motion = machine.Pin(19, machine.Pin.OUT)  # Green LED for motion detection (GP19)
led_temperature = machine.Pin(18, machine.Pin.OUT)  # Blue LED for temperature
dht_sensor = dht.DHT22(machine.Pin(28))  # DHT22 temperature and humidity sensor connected to GP28
led_pin = machine.Pin(21, machine.Pin.OUT)  # LED connected to GP21
trig_pin = machine.Pin(5, machine.Pin.OUT)  # Ultrasonic sensor TRIG connected to GP5
echo_pin = machine.Pin(6, machine.Pin.IN)   # Ultrasonic sensor ECHO connected to GP6




# Function to read potentiometer value and calculate moisture level
def read_moisture_level():
    pot_value = potentiometer_pin.read_u16()  # Read potentiometer value (0-65535)
    moisture_level = pot_value * 100 // 65535  # Convert to percentage (0-100%)
    return moisture_level

# Function to read temperature
def read_temperature():
    dht_sensor.measure()  # Perform measurement
    temperature = dht_sensor.temperature()  # Read temperature
    return temperature

def measure_distance():
    # Trigger pulse
    trig_pin.low()
    utime.sleep_us(2)
    trig_pin.high()
    utime.sleep_us(5)
    trig_pin.low()
# Measure echo pulse duration
    pulse_duration = machine.time_pulse_us(echo_pin, 1, 1000000)  # Timeout of 1 second (1,000,000 microseconds)
    
    # Calculate distance in centimeters
    distance_cm = (pulse_duration * 0.0343) / 2
    
    return distance_cm

# Main loop
while True:
    moisture = read_moisture_level()
    print(f"Moisture level: {moisture}%")

    if moisture > 5:
        led_water.on()  # Turn on LED if moisture level is above 5%
    else:
        led_water.off()  # Turn off LED if moisture level is below or equal to 5%

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
