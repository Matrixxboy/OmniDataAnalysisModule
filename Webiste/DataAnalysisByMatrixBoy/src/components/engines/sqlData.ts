export const SAMPLE_DATABASE_SQL = `
-- Table 1: customers
CREATE TABLE customers (
    customer_id   INT PRIMARY KEY,
    name          STRING,
    email         STRING,
    city          STRING,
    country       STRING,
    signup_date   DATE
);

INSERT INTO customers VALUES
(1,  'Aarav Shah',       'aarav@email.com',    'Mumbai',    'India',  '2022-01-15'),
(2,  'Priya Patel',      'priya@email.com',    'Ahmedabad', 'India',  '2022-03-22'),
(3,  'Ravi Kumar',       'ravi@email.com',     'Delhi',     'India',  '2022-05-10'),
(4,  'Sneha Mehta',      'sneha@email.com',    'Pune',      'India',  '2022-07-04'),
(5,  'John Carter',      'john@email.com',     'New York',  'USA',    '2022-08-30'),
(6,  'Maria Lopez',      'maria@email.com',    'Madrid',    'Spain',  '2023-01-12'),
(7,  'Ananya Singh',     'ananya@email.com',   'Bangalore', 'India',  '2023-02-18'),
(8,  'Wei Zhang',        'wei@email.com',      'Shanghai',  'China',  '2023-04-05'),
(9,  'Fatima Ali',       'fatima@email.com',   'Dubai',     'UAE',    '2023-06-20'),
(10, 'Carlos Mendez',    'carlos@email.com',   'Mexico City','Mexico','2023-09-14');

-- Table 2: products
CREATE TABLE products (
    product_id   INT PRIMARY KEY,
    name         STRING,
    category     STRING,
    price        DECIMAL(10,2),
    stock_qty    INT
);

INSERT INTO products VALUES
(101, 'Laptop Pro 15',      'Electronics',  85000.00, 50),
(102, 'Wireless Mouse',     'Electronics',   1200.00, 200),
(103, 'USB-C Hub',          'Electronics',   2500.00, 150),
(104, 'Running Shoes',      'Footwear',      4500.00, 80),
(105, 'Yoga Mat',           'Fitness',        900.00, 300),
(106, 'Office Chair',       'Furniture',    15000.00, 30),
(107, 'Standing Desk',      'Furniture',    22000.00, 20),
(108, 'Notebook (A4)',      'Stationery',     150.00, 1000),
(109, 'Mechanical Keyboard','Electronics',   6500.00, 75),
(110, 'Monitor 27"',        'Electronics',  28000.00, 40),
(111, 'Water Bottle',       'Fitness',        450.00, 500),
(112, 'Backpack',           'Accessories',   3200.00, 120);

-- Table 3: orders
CREATE TABLE orders (
    order_id      INT PRIMARY KEY,
    customer_id   INT,
    order_date    DATE,
    status        STRING,
    total_amount  DECIMAL(10,2)
);

INSERT INTO orders VALUES
(1001, 1,  '2023-01-05', 'Delivered', 86200.00),
(1002, 2,  '2023-01-18', 'Delivered',  5400.00),
(1003, 3,  '2023-02-10', 'Delivered',  2500.00),
(1004, 4,  '2023-02-25', 'Cancelled',  4500.00),
(1005, 5,  '2023-03-08', 'Delivered', 29200.00),
(1006, 1,  '2023-03-20', 'Delivered',  1200.00),
(1007, 7,  '2023-04-02', 'Pending',   15000.00),
(1008, 2,  '2023-04-15', 'Delivered',   900.00),
(1009, 8,  '2023-05-01', 'Delivered',  6500.00),
(1010, 3,  '2023-05-22', 'Delivered',  3200.00),
(1011, 6,  '2023-06-10', 'Delivered', 22000.00),
(1012, 9,  '2023-06-28', 'Pending',    1350.00),
(1013, 10, '2023-07-14', 'Delivered', 28000.00),
(1014, 4,  '2023-08-05', 'Delivered',  6650.00),
(1015, 5,  '2023-09-19', 'Cancelled',  2500.00);

-- Table 4: order_items
CREATE TABLE order_items (
    item_id     INT PRIMARY KEY,
    order_id    INT,
    product_id  INT,
    quantity    INT,
    unit_price  DECIMAL(10,2)
);

INSERT INTO order_items VALUES
(1, 1001, 101, 1, 85000.00),
(2, 1001, 102, 1,  1200.00),
(3, 1002, 104, 1,  4500.00),
(4, 1002, 105, 1,   900.00),
(5, 1003, 103, 1,  2500.00),
(6, 1004, 104, 1,  4500.00),
(7, 1005, 110, 1, 28000.00),
(8, 1005, 102, 1,  1200.00),
(9, 1006, 102, 1,  1200.00),
(10,1007, 106, 1, 15000.00),
(11,1008, 105, 1,   900.00),
(12,1009, 109, 1,  6500.00),
(13,1010, 112, 1,  3200.00),
(14,1011, 107, 1, 22000.00),
(15,1012, 111, 3,   450.00),
(16,1013, 110, 1, 28000.00),
(17,1014, 109, 1,  6500.00),
(18,1014, 102, 1,  1200.00);

-- Table 5: employees
CREATE TABLE employees (
    employee_id  INT PRIMARY KEY,
    name         STRING,
    department   STRING,
    salary       DECIMAL(10,2),
    manager_id   INT,
    hire_date    DATE
);

INSERT INTO employees VALUES
(1, 'Raj Kapoor',      'Sales',     75000, NULL, '2019-03-01'),
(2, 'Nisha Gupta',     'Sales',     55000, 1,    '2020-06-15'),
(3, 'Amit Sharma',     'Sales',     60000, 1,    '2021-01-10'),
(4, 'Pooja Iyer',      'Marketing', 70000, NULL, '2018-11-20'),
(5, 'Karan Malhotra',  'Marketing', 52000, 4,    '2021-07-05'),
(6, 'Deepa Nair',      'Engineering',90000,NULL, '2017-04-22'),
(7, 'Suresh Pillai',   'Engineering',80000, 6,   '2019-09-30'),
(8, 'Tanya Joshi',     'Engineering',78000, 6,   '2020-02-14'),
(9, 'Arjun Mehta',     'HR',         48000, NULL,'2022-03-08'),
(10,'Simran Kaur',     'HR',         45000, 9,   '2022-08-19');

-- Table 6: departments
CREATE TABLE departments (
    dept_id    INT PRIMARY KEY,
    dept_name  STRING,
    location   STRING
);

INSERT INTO departments VALUES
(1, 'Sales',       'Mumbai'),
(2, 'Marketing',   'Bangalore'),
(3, 'Engineering', 'Pune'),
(4, 'HR',          'Delhi'),
(5, 'Finance',     'Chennai');
`;
