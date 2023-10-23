
import { checkoutWidgets, config } from '@imtbl/sdk';
import { useEffect } from 'react';

interface ConnectComponentProps {
    onConnect: () => void;
  }

const ConnectComponent:  React.FC<ConnectComponentProps> = ({ onConnect }) => {
  const widgetConfig: checkoutWidgets.CheckoutWidgetsConfig = {
    theme: checkoutWidgets.WidgetTheme.LIGHT,
    environment: config.Environment.SANDBOX,
  };
  checkoutWidgets.CheckoutWidgets(widgetConfig);

  const handler = (event: any) => {
    switch (event.detail.type) {
      // Handle the SUCCESS event
      case checkoutWidgets.ConnectEventType.SUCCESS:
        const successData = event.detail.data;
        console.log('success: ', successData);

        const provider = successData.provider;
        console.log('provider: ', provider);

        // Update provider for other widgets
        const connectWidgetElement =
          document.getElementsByTagName('imtbl-connect');
        const connectWidget =
          connectWidgetElement[0] as unknown as ImmutableWebComponent;

        // Set provider object and make use of it within all Checkout widgets
        connectWidget.setProvider(provider);
        onConnect();

        break;

      // ... handle other events

      default:
        console.log('Unsupported event type');
    }
  };

   useEffect(() => {
     if (typeof window !== 'undefined') {
       window.addEventListener(
         checkoutWidgets.IMTBLWidgetEvents.IMTBL_CONNECT_WIDGET_EVENT,
         handler
       );
     }

     return () => {
       if (typeof window !== 'undefined') {
         window.removeEventListener(
           checkoutWidgets.IMTBLWidgetEvents.IMTBL_CONNECT_WIDGET_EVENT,
           handler
         );
       }
     };
   }, []);

  return <checkoutWidgets.ConnectReact />;
};

export default ConnectComponent;