import ImageList from './ImageList';
import Editor from './Editor';
import dayjs from 'dayjs';
import { User } from '@/types/app/user';

interface RecordItemProps {
  id: number | string;
  content: string;
  images: string | string[] | null;
  createTime?: string | number | Date;
  user: Pick<User, 'avatar' | 'name'> | null;
}

const MONTH_ZH = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];

const formatDay = (ts: string | number | Date | undefined) =>
  ts != null ? dayjs(+ts).format('DD') : '--';
const formatMonth = (ts: string | number | Date | undefined) =>
  ts != null ? MONTH_ZH[dayjs(+ts).month()] : '--';
const formatTime = (ts: string | number | Date | undefined) =>
  ts != null ? dayjs(+ts).format('HH:mm') : '--';

/** 根据与当前时间的差值返回相对时间文案 */
function getRelativeTimeLabel(ts: string | number | Date | undefined): string {
  if (ts == null) return '';
  const now = dayjs();
  const then = dayjs(+ts);
  const diffDays = now.startOf('day').diff(then.startOf('day'), 'day');
  const diffMonths = now.diff(then, 'month', true);
  const diffYears = now.diff(then, 'year', true);

  if (diffDays === 0) return '今天';
  if (diffDays === 1) return '昨天';
  if (diffDays >= 2 && diffDays <= 6) return `${diffDays}天前`;
  if (diffDays >= 7 && diffDays <= 13) return '一周前';
  if (diffDays >= 14 && diffDays <= 20) return '两周前';
  if (diffDays >= 21 && diffDays <= 27) return '三周前';
  if (diffMonths >= 1 && diffMonths < 2) return '一月前';
  if (diffMonths >= 2 && diffMonths < 3) return '两月前';
  if (diffMonths >= 3 && diffMonths < 6) return '三月前';
  if (diffMonths >= 6 && diffMonths < 12) return '半年前';
  if (diffYears >= 1 && diffYears < 2) return '一年前';
  if (diffYears >= 2 && diffYears < 3) return '两年前';
  if (diffYears >= 3) return `${Math.floor(diffYears)}年前`;
  return '';
}

export default function RecordCard({ id, content, images, createTime, user }: RecordItemProps) {
  const imageList: string[] = Array.isArray(images) ? images : JSON.parse((images as string) ?? '[]');

  return (
    <article key={id} className="relative flex gap-6 pb-12 group">
      {/* --- 左侧：时间轴装饰 --- */}
      <div className="flex flex-col items-center flex-shrink-0 w-14 pt-1">
        <div className="text-sm font-bold text-slate-400 dark:text-slate-500 tracking-wider">
          {formatMonth(createTime)}
        </div>
        <div className="text-2xl font-black text-slate-800 dark:text-slate-200 font-serif">
          {formatDay(createTime)}
        </div>
        {/* 连接线 */}
        <div className="h-full w-px bg-slate-200 dark:bg-slate-600 my-2 group-last:hidden" />
      </div>

      {/* --- 右侧：主体内容卡片 --- */}
      <div className="flex-grow min-w-0">
        <div className="bg-white dark:bg-black-b rounded-2xl p-5 sm:p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:shadow-none hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:hover:shadow-none transition-shadow duration-300 border border-slate-100 dark:border-black-b">
          {/* Header: 用户与元数据 */}
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <img
                src={user?.avatar}
                alt={user?.name ?? '作者头像'}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-slate-50 dark:ring-slate-800 cursor-pointer transition-transform duration-200 ease-out hover:rotate-6"
              />
              <div>
                <h3 className="font-bold text-slate-800 dark:text-slate-200 text-sm">{user?.name}</h3>
                <div className="text-xs text-slate-400 dark:text-slate-500">{formatTime(createTime)}</div>
              </div>
            </div>
            
            <span className="flex-shrink-0 text-xs text-slate-400 dark:text-slate-500">
              {getRelativeTimeLabel(createTime)}
            </span>
          </div>

          {/* Body: 文本内容 */}
          <div className="prose prose-sm sm:prose-base prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 leading-relaxed break-words">
            <Editor value={content} />
          </div>

          {/* Body: 图片展示 */}
          <div className="mt-3">
            <ImageList list={imageList} />
          </div>

          {/* Footer: 互动栏 (装饰用) */}
          {/* <div className="mt-5 pt-4 border-t border-slate-50 dark:border-slate-700/50 flex items-center justify-end gap-4 text-slate-400 dark:text-slate-500 text-sm">
            <button type="button" className="flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-300 " aria-label="喜欢">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button type="button" className="flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-300 " aria-label="评论">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            <button type="button" className="flex items-center gap-1 hover:text-slate-600 dark:hover:text-slate-300 " aria-label="分享">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div> */}
        </div>
      </div>
    </article>
  );
}
