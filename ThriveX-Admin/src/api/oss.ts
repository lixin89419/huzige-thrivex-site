import Request from '@/utils/request'
import { Oss } from '@/types/app/oss'

// 新增OSS
export const addOssDataAPI = (data: Oss) => Request('POST', '/oss', { data })

// 删除OSS
export const delOssDataAPI = (id: number) => Request('DELETE', `/oss/${id}`)

// 修改OSS
export const editOssDataAPI = (data: Oss) => Request('PATCH', '/oss', { data })

// 获取OSS
export const getOssDataAPI = (id?: number) => Request<Oss>('GET', `/oss/${id}`)

// 获取OSS列表
export const getOssListAPI = () => Request<Oss[]>('POST', `/oss/list`)

// 获取启用的OSS列表
export const getOssEnableListAPI = () => Request<Oss[]>('GET', `/oss/getEnableOss`)

// 启用OSS
export const enableOssDataAPI = (id: number) => Request('PATCH', `/oss/enable/${id}`)

// 禁用OSS
export const disableOssDataAPI = (id: number) => Request('PATCH', `/oss/disable/${id}`)

// 获取支持的OSS平台列表
export const getOssPlatformListAPI = () => Request<{ name: string, value: string }[]>('GET', `/oss/platform`)