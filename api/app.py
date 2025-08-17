import os
import logging
from flask import Flask, render_template, request, flash, jsonify, send_from_directory

# Set up logging
logging.basicConfig(level=logging.DEBUG)

# app = Flask(__name__, static_folder='static', static_url_path='/static')
app = Flask(__name__, static_folder='../static', template_folder='../templates')
app.secret_key = os.environ.get("SESSION_SECRET", "dev-secret-key-change-in-production")

os.makedirs(os.path.join(app.root_path, 'static', 'css'), exist_ok=True)
os.makedirs(os.path.join(app.root_path, 'static', 'images'), exist_ok=True)

@app.route('/static/<path:filename>')
def static_files(filename):
    return send_from_directory(app.static_folder, filename)

@app.route('/')
def index():
    """Main portfolio page"""
    return render_template('index.html')

@app.route('/<path:path>')
def catch_all(path):
    """Handle all other routes for SPA"""
    return render_template('index.html')

@app.route('/contact', methods=['POST'])
def contact():
    """Handle contact form submission"""
    try:
        name = request.form.get('name', '').strip()
        email = request.form.get('email', '').strip()
        message = request.form.get('message', '').strip()
        
        # Basic validation
        if not name or not email or not message:
            flash('All fields are required.', 'error')
            return redirect(url_for('index') + '#contact')
        
        if '@' not in email or '.' not in email:
            flash('Please enter a valid email address.', 'error')
            return redirect(url_for('index') + '#contact')
        
        # In a real application, you would save this to a database or send an email
        # For now, we'll just log it and show a success message
        logging.info(f"Contact form submission: Name={name}, Email={email}, Message={message}")
        
        flash('Thank you for your message! I will get back to you soon.', 'success')
        return redirect(url_for('index') + '#contact')
        
    except Exception as e:
        logging.error(f"Error processing contact form: {e}")
        flash('An error occurred while sending your message. Please try again.', 'error')
        return redirect(url_for('index') + '#contact')

@app.route('/api/contact', methods=['POST'])
def api_contact():
    """API endpoint for contact form (for AJAX submissions)"""
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        message = data.get('message', '').strip()
        
        # Basic validation
        if not name or not email or not message:
            return jsonify({'success': False, 'message': 'All fields are required.'}), 400
        
        if '@' not in email or '.' not in email:
            return jsonify({'success': False, 'message': 'Please enter a valid email address.'}), 400
        
        # Log the submission
        logging.info(f"API Contact form submission: Name={name}, Email={email}, Message={message}")
        
        return jsonify({'success': True, 'message': 'Thank you for your message! I will get back to you soon.'})
        
    except Exception as e:
        logging.error(f"Error processing API contact form: {e}")
        return jsonify({'success': False, 'message': 'An error occurred while sending your message. Please try again.'}), 500

def vercel_handler(request):
    with app.app_context():
        res = app.full_dispatch_request()
    return res

if __name__ == '__main__':
    print(f"📁 Static folder: {app.static_folder}")
    print(f"🌐 Static URL path: {app.static_url_path}")
    print(f"🚀 Server running on: http://0.0.0.0:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)


