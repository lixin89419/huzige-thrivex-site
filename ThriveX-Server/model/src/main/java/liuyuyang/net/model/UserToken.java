package liuyuyang.net.model;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;

@Data
@TableName("user_token")
public class UserToken {
    @TableId(type = IdType.AUTO)
    @ApiModelProperty(value = "ID")
    private Integer id;

    @ApiModelProperty(value = "用户ID", example = "1", required = true)
    private Integer uid;

    @ApiModelProperty(value = "用户token", example = "dadaffasfefewfwf.wefwfwfwwzfwe.zfwfwefZFfw", required = true)
    private String token;
}
