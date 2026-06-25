package liuyuyang.net.model;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
public class File {
    @ApiModelProperty(value = "文件名称", example = "123.txt")
    private String name;
    @ApiModelProperty(value = "文件大小", example = "17240424901572397")
    private Long size;
    @ApiModelProperty(value = "文件类型", example = "image/png")
    private String type;
    @ApiModelProperty(value = "文件地址", example = "http://xxx.com/1.jpg")
    private String url;
    @ApiModelProperty(value = "文件上传时间", example = "1723533206613")
    private Long createTime;
}
