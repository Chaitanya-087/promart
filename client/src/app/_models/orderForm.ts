import { AddressForm } from "./AddressForm";

type AddressFormWithoutId = Omit<AddressForm, 'id'>;

export interface OrderForm {
    cartItemIds: number[];
    paymentMethod: string;
    address:AddressFormWithoutId;
}