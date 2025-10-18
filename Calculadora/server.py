#!/usr/bin/env python3
"""
Servidor Python simple para la calculadora
Ejecutar: python server.py
"""

import http.server
import socketserver
import os
import sys

PORT = 8080

class MyHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Agregar headers CORS para desarrollo
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

def main():
    # Cambiar al directorio del script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    try:
        with socketserver.TCPServer(("", PORT), MyHTTPRequestHandler) as httpd:
            print(f"🚀 Servidor ejecutándose en http://localhost:{PORT}")
            print(f"📱 Calculadora disponible en http://localhost:{PORT}")
            print(f"🔄 Presiona Ctrl+C para detener el servidor")
            print(f"📁 Directorio actual: {os.getcwd()}")
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n🛑 Deteniendo el servidor...")
        print("✅ Servidor detenido correctamente")
    except OSError as e:
        if e.errno == 48:  # Puerto ya en uso
            print(f"❌ Error: El puerto {PORT} ya está en uso")
            print("💡 Intenta con otro puerto o cierra la aplicación que lo esté usando")
        else:
            print(f"❌ Error del servidor: {e}")
    except Exception as e:
        print(f"❌ Error inesperado: {e}")

if __name__ == "__main__":
    main()
