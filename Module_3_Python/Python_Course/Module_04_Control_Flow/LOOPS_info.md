### 🍕 Python `for` Loop — Pizza Edition

Imagine you ordered **5 pizzas**.

Instead of telling the delivery guy 5 times:

```python
print("Deliver pizza!")
print("Deliver pizza!")
print("Deliver pizza!")
print("Deliver pizza!")
print("Deliver pizza!")
```

Python says:

> “Bro, just use a loop.” 💀

```python
for pizza in range(5):
    print("Deliver pizza! 🍕")
```

### How it works:

```python
for pizza in range(5):
```

Means:

> “For every pizza, do the following thing.”

And:

```python
print("Deliver pizza! 🍕")
```

Means:

> “DELIVER IT.” 🏃‍♂️💨

Output:

```text
Deliver pizza! 🍕
Deliver pizza! 🍕
Deliver pizza! 🍕
Deliver pizza! 🍕
Deliver pizza! 🍕
```

Python after 5 pizzas:

> **“Finally… my job here is done.”** 😭

**Simple definition:**
A `for` loop is basically Python saying:

> **“Tell me what to repeat, and I’ll keep doing it until I’m finished.”** 🔄🐍





## Practice
### 🔢 Even & Odd Numbers — Python Style 

Imagine Python is checking students at the school gate:

> **Python:** “Roll number?”
> Student: “7.”
> **Python:** “ODD. Go inside.” 🚶
> Student: “8.”
> **Python:** “EVEN. VIP entry.” 😎

```python
for number in range(1, 11):
    if number % 2 == 0:
        print(number, "is EVEN 🟢")
    else:
        print(number, "is ODD 🔴")
```

### 🧠 What's happening?

`range(1, 11)` → numbers **1 to 10**

`%` → gives the **remainder**

So:

```python
8 % 2 = 0   # EVEN
7 % 2 = 1   # ODD
```

### Output

```text
1 is ODD 🔴
2 is EVEN 🟢
3 is ODD 🔴
4 is EVEN 🟢
5 is ODD 🔴
...
10 is EVEN 🟢
```

Basically:

> **If the number can divide by 2 without leftover drama → EVEN 😎**
> **If there’s a leftover → ODD 💀**
