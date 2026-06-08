// ============================================================
// POWER QUERY — M CODE SNIPPETS
// Topic 18 | Week 18 | Power BI Data Modeling
// ============================================================
// How to use: In Power Query Editor → Home → Advanced Editor
// Paste the relevant snippet to replace or create a query
// ============================================================


// ────────────────────────────────────────────────────────────
// 1. DIM DATE TABLE — Complete Calendar Table
//    New Query → Blank Query → Advanced Editor → paste this
// ────────────────────────────────────────────────────────────

let
    // ── CHANGE THESE DATES to match your data range ──
    StartDate = #date(2020, 1, 1),
    EndDate   = #date(2026, 12, 31),

    NumDays   = Duration.Days(EndDate - StartDate) + 1,
    DateList  = List.Dates(StartDate, NumDays, #duration(1, 0, 0, 0)),
    BaseTable = Table.FromList(DateList, Splitter.SplitByNothing(), {"Date"}),

    // Add columns
    AddYear      = Table.AddColumn(BaseTable,  "Year",          each Date.Year([Date]),                           Int64.Type),
    AddQuarterNum= Table.AddColumn(AddYear,    "Quarter Number", each Date.QuarterOfYear([Date]),                 Int64.Type),
    AddQuarter   = Table.AddColumn(AddQuarterNum,"Quarter",     each "Q" & Text.From(Date.QuarterOfYear([Date])),type text),
    AddMonthNum  = Table.AddColumn(AddQuarter, "Month Number",  each Date.Month([Date]),                         Int64.Type),
    AddMonthName = Table.AddColumn(AddMonthNum,"Month Name",    each Date.MonthName([Date]),                     type text),
    AddMonthShort= Table.AddColumn(AddMonthName,"Month Short",  each Text.Start(Date.MonthName([Date]), 3),      type text),
    AddDay       = Table.AddColumn(AddMonthShort,"Day",         each Date.Day([Date]),                           Int64.Type),
    AddWeekday   = Table.AddColumn(AddDay,     "Weekday",       each Date.DayOfWeekName([Date]),                 type text),
    AddWeekdayNum= Table.AddColumn(AddWeekday, "Weekday Number",each Date.DayOfWeek([Date]),                     Int64.Type),
    AddIsWeekend = Table.AddColumn(AddWeekdayNum,"Is Weekend",  each Date.DayOfWeek([Date]) >= 5,                type logical),
    AddMonthYear = Table.AddColumn(AddIsWeekend,"Month-Year",   each Text.Start(Date.MonthName([Date]),3) & " " & Text.From(Date.Year([Date])), type text),
    AddYearMonth = Table.AddColumn(AddMonthYear,"Year-Month",   each Text.From(Date.Year([Date])) & "-" & Text.PadStart(Text.From(Date.Month([Date])),2,"0"), type text),

    // Set Date column type last
    SetDateType  = Table.TransformColumnTypes(AddYearMonth, {{"Date", type date}})
in
    SetDateType


// ────────────────────────────────────────────────────────────
// 2. DIM CUSTOMER — Extracted from Superstore flat file
//    Duplicate the Superstore query → rename → apply this
// ────────────────────────────────────────────────────────────

let
    Source          = Superstore,   // reference the loaded Superstore query
    SelectCols      = Table.SelectColumns(Source, {"Customer ID", "Customer Name", "Segment"}),
    RemoveDuplicates= Table.Distinct(SelectCols),
    SortRows        = Table.Sort(RemoveDuplicates, {{"Customer Name", Order.Ascending}}),
    AddIndex        = Table.AddIndexColumn(SortRows, "Customer Key", 1, 1, Int64.Type),
    ReorderCols     = Table.ReorderColumns(AddIndex, {"Customer Key","Customer ID","Customer Name","Segment"})
in
    ReorderCols


// ────────────────────────────────────────────────────────────
// 3. DIM PRODUCT — Extracted from Superstore flat file
// ────────────────────────────────────────────────────────────

let
    Source          = Superstore,
    SelectCols      = Table.SelectColumns(Source, {"Product ID", "Product Name", "Category", "Sub-Category"}),
    RemoveDuplicates= Table.Distinct(SelectCols),
    SortRows        = Table.Sort(RemoveDuplicates, {{"Category", Order.Ascending}, {"Sub-Category", Order.Ascending}})
in
    SortRows


// ────────────────────────────────────────────────────────────
// 4. DIM GEOGRAPHY — Extracted from Superstore flat file
// ────────────────────────────────────────────────────────────

let
    Source          = Superstore,
    SelectCols      = Table.SelectColumns(Source, {"Postal Code", "City", "State", "Country", "Region"}),
    // Ensure Postal Code stays as text (leading zeros!)
    ChangeType      = Table.TransformColumnTypes(SelectCols, {{"Postal Code", type text}}),
    RemoveDuplicates= Table.Distinct(ChangeType),
    SortRows        = Table.Sort(RemoveDuplicates, {{"State", Order.Ascending}, {"City", Order.Ascending}})
in
    SortRows


// ────────────────────────────────────────────────────────────
// 5. FACT SALES — Core transaction table
// ────────────────────────────────────────────────────────────

let
    Source      = Superstore,
    SelectCols  = Table.SelectColumns(Source, {
                    "Row ID", "Order ID", "Order Date", "Ship Date",
                    "Ship Mode", "Customer ID", "Product ID", "Postal Code",
                    "Sales", "Quantity", "Discount", "Profit"
                  }),
    // Set correct data types
    ChangeTypes = Table.TransformColumnTypes(SelectCols, {
                    {"Order Date",  type date},
                    {"Ship Date",   type date},
                    {"Sales",       type number},
                    {"Quantity",    Int64.Type},
                    {"Discount",    type number},
                    {"Profit",      type number},
                    {"Postal Code", type text},
                    {"Customer ID", type text},
                    {"Product ID",  type text}
                  }),
    // Add Net Revenue calculated column at PQ level
    AddNetRev   = Table.AddColumn(ChangeTypes, "Net Revenue",
                    each [Sales] * (1 - [Discount]), type number),
    // Add Days to Ship
    AddDaysShip = Table.AddColumn(AddNetRev, "Days to Ship",
                    each Duration.Days([Ship Date] - [Order Date]), Int64.Type)
in
    AddDaysShip


// ────────────────────────────────────────────────────────────
// 6. USEFUL M SNIPPETS — Common Transformations
// ────────────────────────────────────────────────────────────

// Remove blank rows
= Table.SelectRows(#"Previous Step", each not List.IsEmpty(List.RemoveMatchingItems(Record.FieldValues(_), {"", null})))

// Capitalize first letter of each word (Proper Case)
= Table.TransformColumns(#"Previous Step", {{"City", Text.Proper, type text}})

// Trim whitespace from all text columns
= Table.TransformColumns(#"Previous Step", {{"Customer Name", Text.Trim, type text}})

// Add a conditional column (like IF-ELSE)
= Table.AddColumn(#"Previous Step", "High Value",
    each if [Sales] > 5000 then "Yes" else "No", type text)

// Extract Year from Date
= Table.AddColumn(#"Previous Step", "Year",
    each Date.Year([Order Date]), Int64.Type)

// Combine first + last name columns
= Table.AddColumn(#"Previous Step", "Full Name",
    each [First Name] & " " & [Last Name], type text)

// Keep only rows where Status is Delivered or Shipped
= Table.SelectRows(#"Previous Step",
    each List.Contains({"Delivered", "Shipped"}, [Status]))

// Replace all null values in Sales with 0
= Table.ReplaceValue(#"Previous Step", null, 0, Replacer.ReplaceValue, {"Sales"})

// Round Sales to 2 decimal places
= Table.TransformColumns(#"Previous Step",
    {{"Sales", each Number.Round(_, 2), type number}})
