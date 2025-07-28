from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

def filter_devjobs(anahtar_kelime="", sehir="", deneyim_seviyesi="", calisma_turu="", url="https://example.com/devjobs"):
    """
    DevJobs platformundaki iş ilanlarını filtreler.

    Args:
        anahtar_kelime (str): Aranacak anahtar kelime (örn: "Yapay Zeka Mühendisi").
        sehir (str): Aranacak şehir (örn: "İstanbul").
        deneyim_seviyesi (str): İstenen deneyim seviyesi (örn: "Kıdemli", "Junior").
        calisma_turu (str): İstenen çalışma türü (örn: "Tam Zamanlı", "Part-Time").
        url (str): DevJobs platformunun URL'si.
    """
    driver = None
    try:
        # WebDriver'ı başlat (örn: Chrome)
        # chromedriver'ın sistem PATH'inizde olduğundan veya
        # bu Python dosyasının olduğu klasörde bulunduğundan emin olun.
        driver = webdriver.Chrome()

        # DevJobs web sitesini aç
        driver.get(url)

        # Sayfanın yüklenmesini bekle (CSS seçicisi sayfanın yüklendiğini gösterir)
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, ".search-filters"))
        )

        # 1. İş Arama (Anahtar Kelime)
        if anahtar_kelime:
            try:
                # Varsayım: Anahtar kelime input'unun adı 'job_keyword' veya ID'si 'jobSearchInput'
                keyword_input = driver.find_element(By.NAME, "job_keyword") # Genellikle kullanılan yöntem
                # Alternatif olarak ID ile: keyword_input = driver.find_element(By.ID, "jobSearchInput")
                keyword_input.clear()
                keyword_input.send_keys(anahtar_kelime)
                print(f"Anahtar kelime girildi: {anahtar_kelime}")
            except Exception as e:
                print(f"Hata: Anahtar kelime girişini bulamadı veya etkileşim kuramadı: {e}")

        # 2. Şehir
        if sehir:
            try:
                # Varsayım: Şehir input'unun adı 'city' veya ID'si 'citySearchInput'
                city_input = driver.find_element(By.NAME, "city") # Genellikle kullanılan yöntem
                # Alternatif olarak ID ile: city_input = driver.find_element(By.ID, "citySearchInput")
                city_input.clear()
                city_input.send_keys(sehir)
                print(f"Şehir girildi: {sehir}")
            except Exception as e:
                print(f"Hata: Şehir girişini bulamadı veya etkileşim kuramadı: {e}")

        # 3. Deneyim Seviyesi - Açılır Menü
        if deneyim_seviyesi:
            try:
                # Varsayım: Deneyim seviyesi select elementinin adı 'experience_level' veya ID'si 'experienceLevelSelect'
                experience_select_element = driver.find_element(By.NAME, "experience_level") # Genellikle kullanılan yöntem
                # Alternatif olarak ID ile: experience_select_element = driver.find_element(By.ID, "experienceLevelSelect")
                experience_select = Select(experience_select_element)
                experience_select.select_by_visible_text(deneyim_seviyesi) # Açılır menüdeki görünen metni seç
                print(f"Deneyim seviyesi seçildi: {deneyim_seviyesi}")
            except Exception as e:
                print(f"Hata: Deneyim seviyesi açılır menüsünü bulamadı veya etkileşim kuramadı: {e}")

        # 4. Çalışma Türü - Açılır Menü
        if calisma_turu:
            try:
                # Varsayım: Çalışma türü select elementinin adı 'job_type' veya ID'si 'jobTypeSelect'
                job_type_select_element = driver.find_element(By.NAME, "job_type") # Genellikle kullanılan yöntem
                # Alternatif olarak ID ile: job_type_select_element = driver.find_element(By.ID, "jobTypeSelect")
                job_type_select = Select(job_type_select_element)
                job_type_select.select_by_visible_text(calisma_turu) # Açılır menüdeki görünen metni seç
                print(f"Çalışma türü seçildi: {calisma_turu}")
            except Exception as e:
                print(f"Hata: Çalışma türü açılır menüsünü bulamadı veya etkileşim kuramadı: {e}")

        # 5. "İş Ara" Düğmesine Tıkla
        try:
            # Varsayım: İş Ara düğmesi 'type="submit"' olan bir button veya metni "İş Ara" olan bir button
            search_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']") # Yaygın kullanılan yöntem
            # Alternatif olarak ID ile: search_button = driver.find_element(By.ID, "searchButton")
            # Alternatif olarak görünen metinle (XPath): search_button = driver.find_element(By.XPATH, "//button[contains(text(), 'İş Ara')]")
            search_button.click()
            print("'İş Ara' düğmesine tıklandı.")
        except Exception as e:
            print(f"Hata: 'İş Ara' düğmesini bulamadı veya tıklayamadı: {e}")

        # Arama sonuçlarının yüklenmesi için kısa bir bekleme
        time.sleep(5)
        print(f"Arama sonrası mevcut URL: {driver.current_url}")

    except Exception as e:
        print(f"Genel bir hata oluştu: {e}")
    finally:
        if driver:
            # İşlem bitince tarayıcıyı birkaç saniye açık tut, sonra kapat
            time.sleep(5)
            driver.quit()

# --- Örnek Kullanım ---
if __name__ == "__main__":
    # BURAYI DÜZENLEMELİSİNİZ! DevJobs platformunun gerçek ve canlı URL'sini buraya yazın.
    # Örneğin: "https://www.devjobs.com.tr" veya "https://kariyer.devjobs.com" gibi bir URL.
    devjobs_site_adresi = "https://example.com/devjobs" # Bu bir yer tutucudur. Lütfen gerçek URL ile değiştirin!

    print("--- İstanbul'da Kıdemli Tam Zamanlı Yapay Zeka Mühendisi Aranıyor ---")
    filter_devjobs(
        anahtar_kelime="Yapay Zeka Mühendisi",
        sehir="İstanbul",
        deneyim_seviyesi="Kıdemli", # Açılır menüdeki görünen metinle tam eşleşmeli
        calisma_turu="Tam Zamanlı",   # Açılır menüdeki görünen metinle tam eşleşmeli
        url=devjobs_site_adresi
    )

    print("\n--- Ankara'da Veri Bilimci Aranıyor (Deneyim ve Çalışma Türü Belirtilmedi) ---")
    filter_devjobs(
        anahtar_kelime="Veri Bilimci",
        sehir="Ankara",
        url=devjobs_site_adresi
    )

    print("\n--- Sadece Frontend Developer Anahtar Kelimesi ile Arama ---")
    filter_devjobs(
        anahtar_kelime="Frontend Developer",
        url=devjobs_site_adresi
    )

    print("\n--- Hiçbir filtre olmadan sadece sayfayı aç ---")
    filter_devjobs(
        url=devjobs_site_adresi
    )