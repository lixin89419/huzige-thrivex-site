package liuyuyang.net.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@TableName("article_cate")
public class ArticleCate{
    @TableId(type = IdType.AUTO)
    @ApiModelProperty(value = "ID")
    private Integer id;

    @ApiModelProperty(value = "文章ID", example = "1", required = true)
    private Integer articleId;

    @ApiModelProperty(value = "分类ID", example = "1", required = true)
    private Integer cateId;
}
