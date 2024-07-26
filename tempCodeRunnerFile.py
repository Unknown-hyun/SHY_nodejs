import tkinter as tk
from tkinter import messagebox
import json

class LottoGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("로또 당첨번호 입력")

        # 저장된 데이터 로드
        self.data = self.load_data()

        # 입력 필드 초기화
        self.create_input_fields()

        # 저장 버튼
        save_button = tk.Button(root, text="저장", command=self.save_data)
        save_button.pack(pady=10)

    def create_input_fields(self):
        self.input_boxes = []

        # 회차 및 날짜 입력 필드
        round_date_frame = tk.Frame(self.root)
        round_date_frame.pack(pady=5)

        round_label = tk.Label(round_date_frame, text="회차:")
        round_label.pack(side=tk.LEFT, padx=5)

        self.round_entry = tk.Entry(round_date_frame, width=10)
        self.round_entry.pack(side=tk.LEFT, padx=5)

        date_label = tk.Label(round_date_frame, text="날짜:")
        date_label.pack(side=tk.LEFT, padx=5)

        self.date_entry = tk.Entry(round_date_frame, width=15)
        self.date_entry.pack(side=tk.LEFT, padx=5)

        # 당첨번호 입력 필드
        numbers_frame = tk.Frame(self.root)
        numbers_frame.pack(pady=10)

        for i in range(6):
            entry = tk.Entry(numbers_frame, width=5)
            entry.grid(row=0, column=i, padx=5)
            self.input_boxes.append(entry)

            # 이전에 입력된 내용이 있으면 미리 입력
            if self.data and i < len(self.data):
                entry.insert(0, self.data[i])

    def save_data(self):
        # 입력된 데이터를 저장
        round_number = self.round_entry.get()
        draw_date = self.date_entry.get()
        numbers = [entry.get() for entry in self.input_boxes]

        # 데이터 유효성 검사 (회차는 숫자여야 하고, 당첨번호는 모두 입력되어야 함)
        if not round_number.isdigit():
            messagebox.showerror("오류", "회차는 숫자로 입력해주세요.")
            return
        if not all(num.isdigit() for num in numbers):
            messagebox.showerror("오류", "당첨번호는 숫자로 입력해주세요.")
            return

        # 데이터를 JSON 파일로 저장
        data_to_save = {
            '회차': round_number,
            '날짜': draw_date,
            '당첨번호': numbers
        }

        with open('lotto_data.json', 'w') as f:
            json.dump(data_to_save, f, ensure_ascii=False, indent=4)

        messagebox.showinfo("저장 완료", "데이터가 성공적으로 저장되었습니다.")

    def load_data(self):
        try:
            # 저장된 데이터 로드
            with open('lotto_data.json', 'r', encoding='utf-8') as f:
                data = json.load(f)
                return data
        except FileNotFoundError:
            return None

# GUI 실행
if __name__ == "__main__":
    root = tk.Tk()
    lotto_gui = LottoGUI(root)
    root.mainloop()
