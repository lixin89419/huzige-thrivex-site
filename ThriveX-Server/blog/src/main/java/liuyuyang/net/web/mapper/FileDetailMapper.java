package liuyuyang.net.web.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import liuyuyang.net.model.FileDetail;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FileDetailMapper extends BaseMapper<FileDetail> {
    // 自定义SQL方法可以在这里定义
}