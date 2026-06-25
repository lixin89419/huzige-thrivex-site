package liuyuyang.net.dto.album;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class AlbumImageAddFormDTO {
    @ApiModelProperty(value = "相册名称", example = "旅行", required = true)
    private String name;

    @ApiModelProperty(value = "相册介绍", example = "青春没有售价，泰山就在脚下")
    private String description;

    @ApiModelProperty(value = "相册地址", example = "http://123.com/images/example.jpg")
    private String image;

    @ApiModelProperty(value = "相册ID", example = "1")
    private Integer cateId;

    @ApiModelProperty(value = "创建时间", example = "1723533206613", required = true)
    private String createTime;
}