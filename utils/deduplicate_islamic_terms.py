import json
from collections import OrderedDict

input_path = 'resources/js/components/islamic_terms.json'
output_path = 'resources/js/components/islamic_terms_deduped.json'

with open(input_path, 'r', encoding='utf-8') as f:
    data = json.load(f)

seen_terms = set()
deduped_terms = []
for entry in data['terms']:
    term = entry.get('term')
    if term not in seen_terms:
        deduped_terms.append(entry)
        seen_terms.add(term)

with open(output_path, 'w', encoding='utf-8') as f:
    json.dump({'terms': deduped_terms}, f, ensure_ascii=False, indent=2)

print(f"Deduplicated file written to {output_path} with {len(deduped_terms)} unique terms.") 