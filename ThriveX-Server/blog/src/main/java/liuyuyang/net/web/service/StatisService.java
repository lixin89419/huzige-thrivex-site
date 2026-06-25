package liuyuyang.net.web.service;

import com.fasterxml.jackson.databind.JsonNode;

public interface StatisService {
    /**
     * 获取百度统计数据
     * @param startDate 开始日期 (格式: 20240101)，可选
     * @param endDate 结束日期 (格式: 20240131)，可选
     * @return 统计数据的JsonNode对象
     */
    JsonNode getStatisData(String startDate, String endDate);
    
    /**
     * 获取概览时间趋势报表（包含PV、IP、跳出率、平均访问时长）
     * @param startDate 开始日期 (格式: 20240101)，可选
     * @param endDate 结束日期 (格式: 20240131)，可选
     * @return 概览统计数据的JsonNode对象
     */
    JsonNode getOverviewTimeTrend(String startDate, String endDate);
    
    /**
     * 获取新访客趋势报表
     * @param startDate 开始日期 (格式: 20240101)，可选
     * @param endDate 结束日期 (格式: 20240131)，可选
     * @return 新访客统计数据的JsonNode对象
     */
    JsonNode getNewVisitorTrend(String startDate, String endDate);
    
    /**
     * 获取基础概览时间趋势报表（只包含PV和IP）
     * @param startDate 开始日期 (格式: 20240101)，可选
     * @param endDate 结束日期 (格式: 20240131)，可选
     * @return 基础统计数据的JsonNode对象
     */
    JsonNode getBasicOverviewTrend(String startDate, String endDate);
} 