import json
import argparse
from pathlib import Path


def decode_unicode_in_json(data):
    """Рекурсивно декодує лише справжні Unicode escape (\\uXXXX), не ламаючи UTF-8."""
    if isinstance(data, str):
        # Декодуємо тільки якщо є \uXXXX послідовності
        if "\\u" in data:
            try:
                return data.encode("utf-8").decode("unicode_escape")
            except UnicodeDecodeError:
                return data
        return data
    elif isinstance(data, list):
        return [decode_unicode_in_json(item) for item in data]
    elif isinstance(data, dict):
        return {key: decode_unicode_in_json(value) for key, value in data.items()}
    return data


def main():
    parser = argparse.ArgumentParser(
        description="Декодує Unicode escape sequences у JSON файлі."
    )
    parser.add_argument("input_file", help="Шлях до вхідного JSON файлу")
    parser.add_argument(
        "output_file", nargs="?", help="Шлях до вихідного JSON файлу (необов'язково)"
    )
    args = parser.parse_args()

    input_path = Path(args.input_file)
    output_path = (
        Path(args.output_file)
        if args.output_file
        else input_path.with_stem(input_path.stem + "_decoded")
    )

    # ✅ Зчитуємо JSON як текст, а не одразу парсимо
    with open(input_path, "r", encoding="utf-8") as f:
        raw = f.read()

    # ✅ Спочатку json.loads сам розкодує \uXXXX
    data = json.loads(raw)

    # ✅ Потім рекурсивно обробимо залишки
    decoded_data = decode_unicode_in_json(data)

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(decoded_data, f, ensure_ascii=False, indent=2)

    print(f"✅ Готово! Декодований JSON збережено у: {output_path}")


if __name__ == "__main__":
    main()
