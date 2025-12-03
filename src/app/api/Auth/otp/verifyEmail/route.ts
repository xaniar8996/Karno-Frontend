import { BaseAPI } from "@lib/axios";
import { NextRequest, NextResponse } from "next/server";

    export async function POST(req : NextRequest) {
        try{

            const otpResponse = await BaseAPI.post("/otp/verify-account");
            if(otpResponse?.data && otpResponse.status === 200){
                return NextResponse.json(otpResponse.data)
            }
            
            return NextResponse.json(otpResponse.data)
        }catch (error) {
            console.error(error);
            
        }
    }