package liuyuyang.net.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@TableName("wall_cate")
public class WallCate {
    @TableId(type = IdType.AUTO)
    @ApiModelProperty(value = "标签ID")
    private Integer id;

    @ApiModelProperty(value = "分类名称", example = "全部", required = true)
    private String name;

    @ApiModelProperty(value = "分类标识", example = "all", required = true)
    private String mark;

    @TableField("`order`")
    @ApiModelProperty(value = "分类顺序", example = "1")
    private Integer order;
}
