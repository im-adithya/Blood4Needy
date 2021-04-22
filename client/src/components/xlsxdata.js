import axios from "axios";
import React from "react";
import * as XLSX from "xlsx";
import './xlsx.css'

class ExcelToJson extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.state = {
            file: "",
            data: "",
            extension: "",
            warning: ""
        };
    }

    handleClick(e) {
        this.refs.fileUploader.click();
    }

    filePathset(e) {
        e.stopPropagation();
        e.preventDefault();
        var file = e.target.files[0];
        var extension = file.name.split('.').pop()

        this.setState({ file, extension });
    }

    readFile() {
        if (this.state.extension === 'xlsx') {
            this.setState({ warning: '' })
            var f = this.state.file;
            const reader = new FileReader();
            reader.onload = (evt) => {
                // evt = on_file_select event
                /* Parse data */
                const bstr = evt.target.result;
                const wb = XLSX.read(bstr, { type: "binary" });
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });

                axios.post('/api/data/', { data: this.convertToJson(data) })
                    .then(res => {
                        console.log("Uploaded! Refresh the page to see the results.")
                    })
            };
            reader.readAsBinaryString(f);
        } else {
            this.setState({ warning: 'Please upload excel file (.xlsx)' })
        }
    }

    convertToJson(csv) {
        var lines = csv.split("\n");

        var result = [];

        var headers = lines[0].split(",");

        for (var i = 1; i < lines.length; i++) {
            var obj = {};
            var currentline = lines[i].split(",");

            for (var j = 0; j < headers.length; j++) {
                obj[headers[j]] = currentline[j];
            }

            result.push(obj);
        }

        //return result; //JavaScript object
        return JSON.stringify(result); //JSON
    }

    render() {
        return (
            <div className="converter">
                <div className="convinput">
                    <input
                        type="file"
                        id="file"
                        ref="fileUploader"
                        onChange={this.filePathset.bind(this)}
                    />
                    <button className="admin-so" onClick={() => { this.readFile(); }} >Go!</button>
                </div>
                <div className="colorize">
                    {this.state.warning}
                </div>
            </div>
        );
    }
}

export default ExcelToJson;