/**
 * Represents a User Order Data Transfer Object.
 * @class
 */
export default class UserOrderDTO {
    /**
     * @param {number} numberOfCopies - The number of copies to be printed.
     * @param {boolean} doubleSided - Indicates whether the print should be double-sided.
     * @param {boolean} printInColor - Indicates whether the print should be in color.
     * @param {string} paperSize - The size of the paper for printing.
     * @param {string} paperWeight - The weight of the paper for printing.
     * @param {string} paperOrientation - The orientation of the paper for printing.
     * @param {number} turnDoubleSidedPrintBy - The number of pages to turn for double-sided printing.
     * @param {number} pdfNumberOfPages - The number of pages in the PDF file.
     * @param {number} pricePerDocument - The number of pages in the PDF file.
     */
    constructor(
        numberOfCopies,
        doubleSided,
        printInColor,
        paperSize,
        paperWeight,
        paperOrientation,
        turnDoubleSidedPrintBy,
        pdfNumberOfPages,
        pricePerDocument
    ) {
        this.numberOfCopies = numberOfCopies;
        this.doubleSided = doubleSided;
        this.printInColor = printInColor;
        this.paperSize = paperSize;
        this.paperWeight = paperWeight;
        this.paperOrientation = paperOrientation;
        this.turnDoubleSidedPrintBy = turnDoubleSidedPrintBy;
        this.pdfNumberOfPages = pdfNumberOfPages;
        this.pricePerDocument = pricePerDocument;
    }
}
