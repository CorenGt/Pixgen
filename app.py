from flask import Flask, render_template, request, redirect, url_for, jsonify
import requests
import json
import time
import os
from dotenv import load_dotenv
from PIL import Image
from io import BytesIO


MODEL_URL = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0"
MODEL_NAME = "Stable Diffusion XL Base"

def load_token():
    load_dotenv()
    return os.getenv("HF_TOKEN")

def generate_ai_image(prompt, size=None, hf_token=None):
    print(f"🎨 Model: {MODEL_NAME}")
    print(f"📝 Prompt: '{prompt}'")
    print(f"🔍 Size: {size}")
    print("⏳ Görsel oluşturuluyor...")
    
    headers = {}
    if hf_token:
        headers["Authorization"] = f"Bearer {hf_token}"
    
    payload = {"inputs": prompt}
    
    start_time = time.time()
    
    try:
        response = requests.post(
            MODEL_URL, 
            headers=headers, 
            json=payload,
            timeout=60
        )
        
        if response.status_code == 200:
            # Generated images klasörünü kontrol et ve oluştur
            generated_dir = os.path.join('static', 'images', 'generated')
            if not os.path.exists(generated_dir):
                os.makedirs(generated_dir)
            
            # Görsel dosyasını kaydet
            image = Image.open(BytesIO(response.content))
            timestamp = int(time.time())
            filename = f"generated_{timestamp}.png"
            filepath = os.path.join(generated_dir, filename)
            image.save(filepath)
            
            end_time = time.time()
            generation_time = end_time - start_time
                        
            print(f"✅ Görsel kaydedildi: {filepath}")
            print(f"🕒 Süre: {generation_time:.2f} saniye")
            
            # Frontend için relative path
            relative_path = f"images/generated/{filename}"
            return relative_path, True, f"Image generated successfully in {generation_time:.2f} seconds"
            
        elif response.status_code == 503:
            print("⏳ Model yükleniyor, lütfen 20 saniye bekleyin...")
            time.sleep(20)
            return generate_ai_image(prompt, size, hf_token)
            
        else:
            error_msg = f"API Error: {response.status_code}"
            print(f"❌ Hata: {response.status_code}")
            print(f"Detay: {response.text}")
            return None, False, error_msg
            
    except requests.exceptions.Timeout:
        error_msg = "Request timeout. Please try again."
        print("❌ Zaman aşımı! Lütfen tekrar deneyin.")
        return None, False, error_msg
    except Exception as e:
        error_msg = f"Unexpected error: {str(e)}"
        print(f"❌ Beklenmeyen hata: {e}")
        return None, False, error_msg

app = Flask(__name__)

# Ana sayfa - tek sayfa tasarım
@app.route('/')
@app.route('/index.html')
def index():
    return render_template('index.html')

# AI Image Generator handler
@app.route('/generate-image', methods=['POST'])
def generate_image():
    try:
        # Form verilerini al
        prompt = request.form.get('prompt')
        size = request.form.get('size')
        
        # Validation
        if not prompt or not prompt.strip():
            return jsonify({
                'success': False,
                'message': 'Please provide a valid prompt.'
            }), 400 
        # Token yükle
        hf_token = load_token()
        
        # Görsel oluştur
        image_path, success, message = generate_ai_image(prompt.strip(), size, hf_token)
        
        if success:
            response = {
                'success': True,
                'message': message,
                'prompt': prompt,
                'size': size,
                'image_url': url_for('static', filename=image_path)
            }
            return jsonify(response)
        else:
            return jsonify({
                'success': False,
                'message': message
            }), 500
            
    except Exception as e:
        print(f"❌ Error in generate_image route: {e}")
        return jsonify({
            'success': False,
            'message': 'An unexpected error occurred. Please try again.'
        }), 500

# Contact form handler
@app.route('/contact-form', methods=['POST'])
def contact_form():
    if request.method == 'POST':
        # Form verilerini işle
        name = request.form.get('name')
        email = request.form.get('email')
        phone = request.form.get('phone')
        message = request.form.get('message')
        
        # Form verilerini console'a yazdır (geliştirme amaçlı)
        print(f"📧 İletişim Formu Gönderildi:")
        print(f"👤 İsim: {name}")
        print(f"📧 Email: {email}")
        print(f"📞 Telefon: {phone}")
        print(f"💬 Mesaj: {message}")
        
        return jsonify({
            'success': True,
            'message': 'Your message has been sent successfully! We will get back to you soon.'
        })

# 404 Error Handler
@app.errorhandler(404)
def page_not_found(e):
    return redirect(url_for('index'))

# 500 Error Handler
@app.errorhandler(500)
def internal_server_error(e):
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)