# CheckTrak

## Importing Checks

- Imported Files must be in **.CSV** format and in **UTF-8** encoding type.

- Open file ( extracted from SAP or from Bank ) using Microsoft Excel.

### Removing Unnecessary Fields

- Remove unnecesary Rows and Columns ( Ex: headers ) from file leaving necessary columns.

* Necessary Columns

  - Created Checks

    `Bank No, Account, Posting Date, Cheque No, BP Code BP Name, Journal Remarks, Payment Amt`

  - Cleared Checks

    `Check Number, Amount Cleared, Date Cleared`

![removing_unneccessary_fields](https://media.giphy.com/media/hqrkqhDjQDccCob1xU/source.gif)

### Modify Some Rows

- In some cases we have to modify rows value such as ( Account for created Checks ) to be used in indexing which account does a check belong.

- Using Microsoft Excel we can filter data to easily modify rows with the same values.

![modifying_rows_using_data_filter](https://media.giphy.com/media/KzibcJECqyuSdKMsW4/source.gif)

### Format Columns

- Using Microsoft Excel, format columns with date `MM/DD/YYYY` and numbers `#######.##`.

![formatting_columns](https://media.giphy.com/media/JSYut2FYht567NrFHY/source.gif)

### Save as CSV

- Using **Save as** function, were going to convert file to CSV format.

- Close file after saving.

![saving_as_CSV](https://media.giphy.com/media/WOCPsteRMN71wdpiJR/source.gif)

### Change Encoding Type

- To handle special characters, such as `Ñ` file must be encoded in **utf-8** format.

- Were are using Microsoft Notepad to change Encoding Type.

- Close file after saving.

![change_encoding_type](https://media.giphy.com/media/XfsHYEpT7s7K8ee5Oy/source.gif)

### Import File

- Our file now is CSV type and utf-8 encoding.

- We can now import these checks in our Monitoring.

![importing](https://media.giphy.com/media/chKLliGS9dkqBghR1y/source.gif)

- Please be patient in importing checks, it will time to finish, **Dont Refresh Page**.
