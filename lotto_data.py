import tkinter as tk
from tkinter import messagebox
import json

class LottoGUI:
    def __init__(self, root):
        self.root = root
        self.root.title("Lotto Winning Numbers Entry")

        # Load saved data
        self.data = self.load_data()

        # Initialize input fields
        self.create_input_fields()

        # Save button
        save_button = tk.Button(root, text="Save", command=self.save_data)
        save_button.pack(pady=10)

        # List button
        list_button = tk.Button(root, text="View Saved List", command=self.show_saved_list)
        list_button.pack(pady=10)

    def create_input_fields(self):
        self.input_boxes = []

        # Round and Date entry fields
        round_date_frame = tk.Frame(self.root)
        round_date_frame.pack(pady=5)

        round_label = tk.Label(round_date_frame, text="Round:")
        round_label.pack(side=tk.LEFT, padx=5)

        self.round_entry = tk.Entry(round_date_frame, width=10)
        self.round_entry.pack(side=tk.LEFT, padx=5)

        date_label = tk.Label(round_date_frame, text="Date:")
        date_label.pack(side=tk.LEFT, padx=5)

        self.date_entry = tk.Entry(round_date_frame, width=15)
        self.date_entry.pack(side=tk.LEFT, padx=5)

        # Winning numbers entry fields
        numbers_frame = tk.Frame(self.root)
        numbers_frame.pack(pady=10)

        for i in range(6):
            entry = tk.Entry(numbers_frame, width=5)
            entry.grid(row=0, column=i, padx=5)
            self.input_boxes.append(entry)

            # Pre-fill with previously saved data if available
            if self.data and 'WinningNumbers' in self.data and i < len(self.data['WinningNumbers']):
                entry.insert(0, self.data['WinningNumbers'][i])

    def save_data(self):
        # Save the entered data
        round_number = self.round_entry.get()
        draw_date = self.date_entry.get()
        numbers = [entry.get() for entry in self.input_boxes]

        # Data validation (Round should be a number, and all winning numbers should be entered)
        if not round_number.isdigit():
            messagebox.showerror("Error", "Round must be a number.")
            return
        if not all(num.isdigit() for num in numbers):
            messagebox.showerror("Error", "Winning numbers must be numbers.")
            return

        # Save data to JSON file
        data_to_save = {
            'Round': round_number,
            'Date': draw_date,
            'WinningNumbers': numbers
        }

        with open('lotto_data.json', 'w') as f:
            json.dump(data_to_save, f, ensure_ascii=False, indent=4)

        messagebox.showinfo("Save Complete", "Data has been successfully saved.")

    def load_data(self):
        try:
            # Load saved data
            with open('lotto_data.json', 'r', encoding='utf-8') as f:
                data = json.load(f)
                return data
        except FileNotFoundError:
            return None
        except UnicodeDecodeError:
            messagebox.showerror("Error", "Unable to read file. Please check the encoding.")
            return None

    def show_saved_list(self):
        if self.data:
            messagebox.showinfo("Saved List", f"Round: {self.data.get('Round', 'N/A')}\nDate: {self.data.get('Date', 'N/A')}\nWinning Numbers: {', '.join(self.data.get('WinningNumbers', ['N/A'])).replace('[','').replace(']','').replace(\"'\",\"\")}")
        else:
            messagebox.showinfo("Saved List", "No saved data.")

# Run the GUI
if __name__ == "__main__":
    root = tk.Tk()
    lotto_gui = LottoGUI(root)
    root.mainloop()
