import os
import django
import pandas as pd
from api.models import Ambientes

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'back.settings')
django.setup()

print("📄 Lendo planilha...")
excel_path = os.path.join(os.path.dirname(__file__), 'Ambientes.xlsx')

df = pd.read_excel(excel_path)
print("Planilha carregada.")
print("Colunas:", df.columns.tolist())

contador = 0
for index, row in df.iterrows():
    print(f"Inserindo linha {index + 1} -- ", row.to_dict())
    try:
        obj = Ambientes.objects.create(
            sig=str(row['sig']),
            descricao=str(row['descricao']),
            ni=str(row['ni']),
            responsavel=str(row['responsavel'])
        )
        contador += 1
    except Exception as e:
        print(f"Erro na linha {index + 1}: {e}")

print(f"✅ Inserções concluídas: {contador}")
