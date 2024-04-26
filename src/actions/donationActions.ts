'use server';
import {DonationModel} from "@/models/Donation";
import {ProfileInfoModel} from "@/models/ProfileInfo";
import axios from "axios";
import md5 from "md5";
import mongoose from "mongoose";

export async function createDonation(formData: FormData): Promise<string|false> {

  // 1. save to our db
  const {amount, name, message, crypto, email} = Object.fromEntries(formData);
  await mongoose.connect(process.env.MONGODB_URI as string);
  const donationDoc = await DonationModel.create({
    amount, name, message, crypto, email,
  });
  const profileInfoDoc = await ProfileInfoModel.findOne({email});
  if (!profileInfoDoc) {
    return false;
  }

  // 2. create a cryptomus invoice and return the url
  const endpoint = 'https://api.cryptomus.com/v1/payment';
  const apiKey = process.env.CRYPTOMUS_PAYMENT_API_KEY as string;
  const data = {
    amount: (parseInt(amount as string) * 5).toString() + '.00',
    currency: 'USD',
    order_id: donationDoc._id.toString(),
    to_currency: (crypto as string).toUpperCase(),
    url_callback: 'https://23a1-94-255-134-174.ngrok-free.app/callback?id='+donationDoc._id,
    url_return: process.env.NEXTAUTH_URL + '/' + profileInfoDoc.username,
    url_success: process.env.NEXTAUTH_URL + '/' + profileInfoDoc.username + '?success=1',
  };
  const merchant = process.env.CRYPTOMUS_MERCHANT_ID as string;
  const sign = md5(btoa(JSON.stringify(data)) + apiKey);
  try {
    console.log({data});
    const response = await axios.post(endpoint, data, {
      headers: {
        merchant,
        sign,
      }
    });

    return response.data.result.url;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      console.log(e.response.status);
      console.log(e.response.data);
    }
  }

  return false;
}