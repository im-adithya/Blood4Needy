import jsPDF from "jspdf";
import template from "./certiTemplate"

const generateCerti = (name,date) => {
    var imgData = template;
    var options = {orientation: 'l', unit: 'mm'};
    var doc = new jsPDF(options);
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();
    doc.setFontSize(20);
    doc.addImage(imgData, 'JPEG', 0, 0, width, height);
    doc.text(`${name}`, width/2, 95, {align: 'center'});
    doc.setFontSize(12);
    doc.text(`${date}`, width*0.8125, height-45, {align: 'center'});
    doc.text(`Lakshya Goyal`, width*0.19, height-45, {align: 'center'});
    doc.save(`Certificate.pdf`);
}

export default generateCerti;