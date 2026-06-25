package liuyuyang.net.dto.album;

import com.baomidou.mybatisplus.annotation.TableField;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class AlbumCateAddFormDTO {
    @ApiModelProperty(value = "相册名称", example = "旅行", required = true)
    private String name;

    @ApiModelProperty(value = "相册封面", example = "http://123.com/images/example.jpg")
    private String cover;

    @TableField(exist = false)
    @ApiModelProperty(value = "相册的照片数量", example = "10")
    private Integer count;
}
