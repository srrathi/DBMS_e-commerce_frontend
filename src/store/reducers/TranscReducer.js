const initialState = {
  previousTransactions: [],
};

const TranscReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PREVIOUS_TRANSACTIONS":
      const allTransactions = action.payload.data;
      const invoiceIdsSet = new Set(
        allTransactions.map((item) => item.transc_invoice_number)
      );
      const invoiceIdsArray = Array.from(invoiceIdsSet);
      // console.log(invoiceIdsArray);

      const transcData = invoiceIdsArray.map((invoiceId) => {
        var invoiceTranscations = allTransactions.filter(
          (transc) => transc.transc_invoice_number === invoiceId
        );
        invoiceTranscations = invoiceTranscations.map((item) => {
          const transcFormattedObj = {
            transcId: item.transc_id,
            transcDate: item.transc_date,
            transcProductId: item.transc_product_id,
            transcSellerId: item.transc_seller_id,
            transcCustomerId: item.transc_customer_id,
            transcInvoiceNumber: item.transc_invoice_number,
            transcShippingAddress: item.transc_shipping_address,
            transcProductCount: item.transc_product_count,
            transcProductPrice: item.transc_product_price,
            transcProductName: item.transc_product_name,
          };
          return transcFormattedObj;
        });
        return {
          invoiceNumber: invoiceId,
          invoiceTranscations: invoiceTranscations,
        };
      });
      // console.log(transcData);
      return {
        ...state,
        previousTransactions: transcData.reverse(),
      };
    default:
      return state;
  }
};
export default TranscReducer;
