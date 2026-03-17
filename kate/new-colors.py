import pandas as pd
import re

# 1. Configuration & Data
colors = [
    "2A", "30", "4A", "33", "60A", "99J", "White", "T1B-P1B/3", "T2-White", "T2-P2/6", 
    "T2/P2/18", "T3-P3/18/60A", "T3-P4/16", "T4-P4/18", "T4-P9/18/60", "T7-60A", 
    "T7-P7/60A", "T8N-P8N/18", "T8N-P8N/60", "T8N-P8N/18/60", "T8N-P18/60A", 
    "T9-P9/22/60", "T9-P9/24", "T18-P18/60A"
]

# Descriptions (Templates)
desc_angel_tape = "Angel Tape-Ins are one of the fastest and most versatile extension methods... [Full Text from Chat]"
desc_invisible = "Angel Invisible Tape-Ins are designed for the most seamless tape-in install... [Full Text from Chat]"
desc_angel_weft = "The most versatile weft with the fastest blow-drying time! Our Angel Wefts..."
desc_volume_weft = "Our volume wefts are sewn by machine, double drawn, deconstructable..."
desc_itip = "Our I Tip extensions feature durable, long lasting flex Italian Keratin tips..."
desc_keratin = "Our Keratin Fusion (K Tip) extensions are made with Italian Keratin..."

# Sizes and Patterns
full_sizes = ["14\"", "16\"", "18\"", "20\"", "22\"", "24\"", "26\"", "28\""]
limited_sizes = ["14\"", "18\"", "22\"", "24\""]
patterns = ["Straight", "Natural Wave"]

def get_price(base, size, is_wave, jump):
    # Calculates price based on size increments from 14"
    size_num = int(size.replace('"', ''))
    increments = (size_num - 14) // 2
    price = base + (increments * jump)
    if is_wave: price += 25
    return price

# Application Type Mapping
apps = {
    "angel-weft": {"title": "Angel Weft", "base": 260, "jump": 25, "sizes": full_sizes, "body": desc_angel_weft},
    "volume-weft": {"title": "Volume Weft", "base": 235, "jump": 40, "sizes": full_sizes, "body": desc_volume_weft},
    "itip": {"title": "I-Tip", "base": 260, "jump": 25, "sizes": limited_sizes, "body": desc_itip},
    "keratin": {"title": "Keratin", "base": 260, "jump": 25, "sizes": limited_sizes, "body": desc_keratin},
    "tape-in": {"title": "Tape-In", "base": 260, "jump": 25, "sizes": limited_sizes, "body": desc_angel_tape},
    "invisible-tape": {"title": "Invisible Tape", "base": 310, "jump": 25, "sizes": limited_sizes, "body": desc_invisible},
    "tape-in-weft": {"title": "Tape-In Weft", "base": 235, "jump": 40, "sizes": full_sizes, "body": "[Placeholder: Tape-In Weft Description]"},
    "angel-veil": {"title": "Angel Veil Tape-In Weft", "base": 235, "jump": 40, "sizes": full_sizes, "body": "[Placeholder: Angel Veil Description]"}
}

# 2. Generate Rows
rows = []
for color in colors:
    color_slug = re.sub(r'[^a-z0-9]', '-', color.lower())
    for app_slug, info in apps.items():
        handle = f"{color_slug}-{app_slug}"
        title = f"#{color} {info['title']}"
        
        for size in info['sizes']:
            for pattern in patterns:
                price = get_price(info['base'], size, (pattern == "Natural Wave"), info['jump'])
                
                # Create row (following your CSV column structure)
                row = {
                    "Handle": handle,
                    "Title": title if (size == info['sizes'][0] and pattern == patterns[0]) else "",
                    "Body (HTML)": info['body'] if (size == info['sizes'][0] and pattern == patterns[0]) else "",
                    "Vendor": "Angel Extensions",
                    "Type": "Hair Extensions",
                    "Published": "TRUE",
                    "Option1 Name": "Size",
                    "Option1 Value": size,
                    "Option2 Name": "Wave Pattern",
                    "Option2 Value": pattern,
                    "Variant Price": price,
                    "Status": "active"
                }
                rows.append(row)

# 3. Export to CSV
final_df = pd.DataFrame(rows)
final_df.to_csv("Task2_Import.csv", index=False)
print("Task 2 CSV generated successfully!")