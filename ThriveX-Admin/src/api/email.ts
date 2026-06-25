import Request from '@/utils/request'
import { DismissEmail, ReplyWallEmail } from '@/types/app/email'

// 发送驳回邮件
export const sendDismissEmailAPI = async (data: DismissEmail) => {
    return await Request<string>('POST', `/email/dismiss`, { data });
}

// 发送回复留言邮件
export const sendReplyWallEmailAPI = async (data: ReplyWallEmail) => {
    return await Request<string>('POST', `/email/reply_wall`, { data });
}