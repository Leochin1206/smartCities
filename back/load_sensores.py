import os
import django
import pandas as pd  # não esqueça de importar o pandas!

# Configure o ambiente do Django antes de importar os modelos
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'back.settings')  # Corrigido para refletir sua estrutura
django.setup()

from api.models import Sensores

planilhas = {
    'contador.xlsx':        ('Contador de Pessoas', 'Un'),
    'luminosidade.xlsx':    ('Luminosidade', 'Lux'),
    'temperatura.xlsx':     ('Temperatura', '°C'),
    'umidade.xlsx':         ('Umidade', '%'),
}

BASE_PATH = os.path.dirname(__file__)
inseridos = 0

for nome_arquivo, (tipo_sensor, unidade) in planilhas.items():
    caminho = os.path.join(BASE_PATH, nome_arquivo)
    print(f"\nLendo {nome_arquivo}...")

    try:
        df = pd.read_excel(caminho)
    except Exception as e:
        print(f"Erro ao abrir {nome_arquivo}: {e}")
        continue

    print(f"Colunas encontradas: {df.columns.tolist()}")

    for index, row in df.iterrows():
        try:
            obj = Sensores.objects.create(
                sensor=tipo_sensor,
                mac_address=str(row['mac_address']),
                unidade_med=unidade,
                valor=str(row['valor']),
                latitude=float(row['latitude']),
                longitude=float(row['longitude']),
                status=str(row['status']),
                timestamp=str(row['timestamp'])
            )
            inseridos += 1
        except Exception as e:
            print(f"Erro na linha {index + 2} do arquivo {nome_arquivo}: {e}")

print(f"\nTotal de sensores inseridos: {inseridos}")
