export interface Email {
  /*邮件接收者 */
  to?: string;
  /*邮件标题 */
  subject: string;
  /*邮件接收者 */
  recipient: string;
}

export interface CommentEmail extends Email {
  content: string;
  time: string;
  title: string;
  url: string;
}

export interface DismissEmail extends Email {
  content: string;
  time: string;
  type: string;
  url: string;
}

export interface ReplyWallEmail extends Omit<Email, 'subject'> {
  /*你的留言 */
  your_content: string;
  /*回复留言 */
  reply_content: string;
  /*留言时间 */
  time: string;
  /*留言链接 */
  url: string;
}
