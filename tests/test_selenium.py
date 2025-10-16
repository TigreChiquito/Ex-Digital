import time

import pandas as pd

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

## C:/ProgramData/Anaconda3/Scripts/conda.exe run -p C:\ProgramData\Anaconda3 --no-capture-output python test_selenium.py

def register_user(driver, email, password, name="Usuario Test", phone="123456789"):
    """Registra un usuario en el sistema antes de hacer login"""
    print(f"Registrando usuario: {email}")
    
    driver.get("https://tigrechiquito.github.io/Ex-Digital/pages/registro.html")
    
    # Wait for page to load
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "nombre"))
    )
    
    # Fill registration form
    driver.find_element(By.ID, "nombre").send_keys(name)
    driver.find_element(By.ID, "correo").send_keys(email)
    driver.find_element(By.ID, "contraseña").send_keys(password)
    driver.find_element(By.ID, "confirmar-contraseña").send_keys(password)
    driver.find_element(By.ID, "telefono").send_keys(phone)
    
    # Submit form
    driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
    
    time.sleep(2)
    
    try:
        # Handle alert
        WebDriverWait(driver, 5).until(EC.alert_is_present())
        alert = driver.switch_to.alert
        alert_text = alert.text
        print(f"Registration alert: {alert_text}")
        alert.accept()
    except:
        pass
    
    time.sleep(1)
    print("Usuario registrado exitosamente")

def test_login(driver, email, password):
    # Wait for page to load
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "correo"))
    )

    element1 = driver.find_element(By.ID, "correo")
    print(f"Correo field found")
    element1.click()
    element1.send_keys(email)

    element2 = driver.find_element(By.ID, "contraseña")
    print(f"Contraseña field found")
    element2.click()
    element2.send_keys(password)

    time.sleep(1)  # Pause to see the result

    element3 = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
    print(f"Submit button text: {element3.text}")
    element3.click()

    time.sleep(2)  # Wait for alert to appear

    try:
        # Wait for alert and handle it
        WebDriverWait(driver, 5).until(EC.alert_is_present())
        alert = driver.switch_to.alert
        alert_text = alert.text
        print(f"Alert message: {alert_text}")
        alert.accept()
        
        time.sleep(1)  # Wait for redirect
        
        print("Current URL after login:")
        print(driver.current_url)
        
        if "index.html" in driver.current_url or driver.current_url.endswith("Ex-Digital/"):
            print("✓ Login successful - redirected to index")
        else:
            print("✗ Login failed - not redirected")
            
    except Exception as e:
        print(f"Error handling alert: {e}")
        print(f"Current URL: {driver.current_url}")

    time.sleep(2)  # Pause to see the result



if __name__ == "__main__":
    df = pd.read_csv("test_data.csv")
    
    # Create a single browser instance
    driver = webdriver.Chrome()
    
    try:
        # First, register the test user (first row)
        first_user = df.iloc[0]
        print("="*60)
        print("PASO 1: Registrando usuario de prueba")
        print("="*60)
        
        register_user(driver, first_user["email"], first_user["password"])
        
        print("\n" + "="*60)
        print("PASO 2: Probando login con usuario registrado")
        print("="*60 + "\n")
        
        # Test login only for the registered user
        print(f"\nTesting login for: {first_user['email']}")
        print("-"*60)
        
        driver.get("https://tigrechiquito.github.io/Ex-Digital/pages/login.html")
        test_login(driver, first_user["email"], first_user["password"])
        print("-"*60)
        
        print("\n" + "="*60)
        print("PASO 3: Probando login con usuarios NO registrados (deberían fallar)")
        print("="*60 + "\n")
        
        # Test with other users (should fail)
        for index, row in df.iloc[1:].iterrows():
            email = row["email"]
            password = row["password"]
            print(f"\nTesting login for: {email}")
            print("-"*60)
            
            driver.get("https://tigrechiquito.github.io/Ex-Digital/pages/login.html")
            test_login(driver, email, password)
            print("-"*60)
            
    finally:
        driver.quit()
        print("\n" + "="*60)
        print("Tests completados")
        print("="*60)