package liuyuyang.net.web.service;

import liuyuyang.net.model.PageConfig;
import java.util.List;
import java.util.Map;

public interface PageConfigService {
    /**
     * 根据ID获取页面配置
     */
    PageConfig getById(Integer id);

    /**
     * 获取全部页面配置列表
     */
    List<PageConfig> list();

    /**
     * 更新 JSON 配置值
     */
    boolean updateJsonValue(Integer id, Map<String, Object> jsonValue);

    /**
     * 根据名称获取页面配置
     */
    PageConfig getByName(String name);
} 