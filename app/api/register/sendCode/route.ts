import { NextResponse } from "next/server";
import { checkEmailAvailability } from "@/app/_services/auth/verifications/email.service";
import { sendEmail } from "@/app/_services/_email/email.service";
import responseUtil from '@/app/_utils/response/response';

export async function POST(req: Request) {
    try {
        const data = await req.json();
        const { email } = data;

        const isEmailExist = await checkEmailAvailability(email);
        if (!isEmailExist) {
            return await responseUtil('이미 등록된 이메일', 400)
        }

        const isSentSuccessfully = await sendEmail(1, email, "");
        if (!isSentSuccessfully) {
            return await responseUtil('이메일 전송 실패', 500)
        }

        return await responseUtil('성공', 200)

    } catch (error) {
        return await responseUtil('서버 오류 발생', 500)
    }
}