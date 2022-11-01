import { LightningElement,track, wire ,api} from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';
import ACCOUNT_NAME_FIELD from '@salesforce/schema/Account.Name';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class ModalPopupLWC extends LightningElement {
//Boolean tracked variable to indicate if modal is open or not default value is false as modal is closed when page is loaded 
@track isModalOpen = true;
@track screen2=false;
@track screen3=false;
@api recordId;
@track record;
@track error;
@track name;
@track  d = new Date();
@track date=this.d.getDate()+"/"+this.d.getMonth()+"/"+this.d.getFullYear();
@wire(getRecord, { recordId: '$recordId', fields: [ACCOUNT_NAME_FIELD] })
wiredAccount({ error, data }) {
        if (data) {
            console.log(" data"+JSON.stringify(data));
            this.record = data;
            this.name=this.record.fields.Name.value;
            console.log(" data"+JSON.stringify(data.fields.Name.value));

            this.error = undefined;
        } else if (error) {
            this.error = error;
            this.record = undefined;
        }
    }
    get name() {
        console.log( this.data.fields.Name.value);
        return this.record.fields.Name.value;
        //   this.name;
    }

model3()
{
        this.screen3=true;
        this.screen2=false;
}
model4()
{
 this.isModalOpen=true;
 this.screen2=false;
 this.screen3=false;   
}
model2()
{
    this.screen2=true;
    this.isModalOpen=false;
    this.screen3=false;
}

closeModal() {
    // to close modal set isModalOpen tarck value as false
    this.isModalOpen = false;
    this.screen2=false;
    this.screen3=false;
}
submitDetails() {
    // to close modal set isModalOpen tarck value as false
    //Add your code to call apex method or do some processing
    this.isModalOpen = false;
    this.screen2=false;
    this.screen3=false;
    const evt = new ShowToastEvent({
        title: 'Success',
        message: 'QBR Form Submit SuccessFull',
        variant: 'success',
        mode: 'dismissable'
    });
    eval("$A.get('e.force:refreshView').fire();");
    this.dispatchEvent(evt);
}
}