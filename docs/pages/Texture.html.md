> 🌐 本文档由 [mrdoob/three.js](https://github.com/mrdoob/three.js) 翻译,英文原版见原项目。

*继承关系:EventDispatcher →*

# Texture(纹理)

所有纹理的基类。

注意:纹理首次使用后,其尺寸、格式与类型不可再更改。此时应对该纹理调用 [Texture#dispose](Texture.html#dispose),然后重新实例化一个新纹理。

> 📝 本页原文超过 10000 字符,以下翻译核心章节;次要属性(`.channel`、`.depth`、`.internalFormat`、`.normalized`、`.unpackAlignment`、`.updateRanges`、`.pmremVersion`、`.renderTarget`)、局部更新方法(`addUpdateRange()` / `clearUpdateRanges()`)与 `Events` 事件小节请参阅[英文原版](https://github.com/mrdoob/three.js/blob/master/docs/pages/Texture.html.md)。

## 构造函数

### new Texture( image : Object, mapping : number, wrapS : number, wrapT : number, magFilter : number, minFilter : number, format : number, type : number, anisotropy : number, colorSpace : string )

创建一个新纹理。

**image**

承载纹理数据的图像。

默认值为 `Texture.DEFAULT_IMAGE`。

**mapping**

纹理映射方式。

默认值为 `Texture.DEFAULT_MAPPING`。

**wrapS**

wrapS 取值。

默认值为 `ClampToEdgeWrapping`。

**wrapT**

wrapT 取值。

默认值为 `ClampToEdgeWrapping`。

**magFilter**

放大(magnification)过滤器取值。

默认值为 `LinearFilter`。

**minFilter**

缩小(minification)过滤器取值。

默认值为 `LinearMipmapLinearFilter`。

**format**

纹理格式。

默认值为 `RGBAFormat`。

**type**

纹理类型。

默认值为 `UnsignedByteType`。

**anisotropy**

各向异性(anisotropy)取值。

默认值为 `Texture.DEFAULT_ANISOTROPY`。

**colorSpace**

色彩空间。

默认值为 `NoColorSpace`。

## 属性

### .anisotropy : number

沿穿过纹素(texel)密度最高的像素的轴所采样的样本数。默认值为 `1`。更高的取值可以获得比普通 mipmap 更不模糊的结果,代价是使用更多纹理采样。

默认值为 `Texture.DEFAULT_ANISOTROPY`。

### .center : Vector2

旋转所围绕的中心点。`(0.5, 0.5)` 对应纹理中心。默认值为 `(0, 0)`,即左下角。

默认值为 `(0,0)`。

### .colorSpace : string

包含颜色数据的纹理应标注为 `SRGBColorSpace` 或 `LinearSRGBColorSpace`。

默认值为 `NoColorSpace`。

### .flipY : boolean

设为 `true` 时,纹理在上传到 GPU 时会沿垂直轴翻转。

注意:使用 `ImageBitmap` 时该属性无效,需要在创建位图时配置翻转。

默认值为 `true`。

### .format : number

纹理的格式。

默认值为 `RGBAFormat`。

### .generateMipmaps : boolean

是否为纹理生成 mipmap(如可能)。

若你手动创建 mipmap,请将其设为 `false`。

默认值为 `true`。

### .height

纹理的高度,单位为像素。

### .id : number (只读)

该纹理的 ID。

### .image : Object

承载纹理数据的图像对象。

### .isArrayTexture : boolean (只读)

指示该纹理是否应按纹理数组(texture array)处理。

默认值为 `false`。

### .isRenderTargetTexture : boolean (只读)

指示该纹理是否属于某个渲染目标。

默认值为 `false`。

### .isTexture : boolean (只读)

该标志可用于类型判断。

默认值为 `true`。

### .magFilter : NearestFilter | NearestMipmapNearestFilter | NearestMipmapLinearFilter | LinearFilter | LinearMipmapNearestFilter | LinearMipmapLinearFilter

当一个纹素覆盖多个像素时,纹理的采样方式。

默认值为 `LinearFilter`。

### .mapping : UVMapping | CubeReflectionMapping | CubeRefractionMapping | EquirectangularReflectionMapping | EquirectangularRefractionMapping | CubeUVReflectionMapping

纹理贴附到对象上的方式。默认值 `UVMapping` 表示使用纹理坐标(uv)来应用贴图。

默认值为 `UVMapping`。

### .matrix : Matrix3

纹理的 UV 变换矩阵。

### .matrixAutoUpdate : boolean

是否根据 [Texture#offset](Texture.html#offset)、[Texture#repeat](Texture.html#repeat)、[Texture#rotation](Texture.html#rotation) 与 [Texture#center](Texture.html#center) 属性自动更新纹理的 UV 变换矩阵 [Texture#matrix](Texture.html#matrix)。

若要直接指定 UV 变换矩阵,请将其设为 `false`。

默认值为 `true`。

### .minFilter : NearestFilter | NearestMipmapNearestFilter | NearestMipmapLinearFilter | LinearFilter | LinearMipmapNearestFilter | LinearMipmapLinearFilter

当一个纹素覆盖不足一个像素时,纹理的采样方式。

默认值为 `LinearMipmapLinearFilter`。

### .mipmaps : Array.<Object>

保存用户自定义 mipmap 的数组。

### .name : string

该纹理的名称。

### .needsUpdate : boolean

将该属性设为 `true` 表示引擎必须在下一次渲染时更新该纹理。这会触发纹理向 GPU 的上传,并确保纹理参数被正确配置。

默认值为 `false`。

### .offset : Vector2

纹理单次重复在每个方向(U 与 V)上相对起点的偏移量。典型范围为 `0.0` 到 `1.0`。

默认值为 `(0,0)`。

### .onUpdate : function

回调函数,在纹理被更新时调用(例如 [Texture#needsUpdate](Texture.html#needsUpdate) 被设为 `true` 之后、纹理被使用时)。

默认值为 `null`。

### .premultiplyAlpha : boolean

设为 `true` 时,纹理上传到 GPU 时若有 alpha 通道,会将其预乘进颜色通道。

注意:使用 `ImageBitmap` 时该属性无效,需要在创建位图时配置预乘 alpha。

默认值为 `false`。

### .repeat : Vector2

纹理在表面上的重复次数,分 U 与 V 两个方向。若任一方向的 repeat 大于 `1`,应把对应的 wrap 参数也设为 `RepeatWrapping` 或 `MirroredRepeatWrapping`,以获得预期的平铺效果。

默认值为 `(1,1)`。

### .rotation : number

纹理绕中心点旋转的角度,单位为弧度。正值表示逆时针。

默认值为 `0`。

### .source : Source

纹理的数据定义。对数据源的引用可以在多个纹理之间共享,这在精灵图(spritesheet)场景中特别有用:多个纹理渲染同一份数据,但应用不同的纹理变换。

### .type : number

纹理的数据类型。

默认值为 `UnsignedByteType`。

### .userData : Object

可用于存储该纹理自定义数据的对象。不应在其中保存函数引用,因为函数不会被克隆。

### .uuid : string (只读)

该纹理的 UUID。

### .version : number (只读)

从 `0` 开始,记录 [Texture#needsUpdate](Texture.html#needsUpdate) 被设为 `true` 的次数。

默认值为 `0`。

### .width

纹理的宽度,单位为像素。

### .wrapS : RepeatWrapping | ClampToEdgeWrapping | MirroredRepeatWrapping

定义纹理的水平包裹方式,对应 UV 映射中的 _U_。

默认值为 `ClampToEdgeWrapping`。

### .wrapT : RepeatWrapping | ClampToEdgeWrapping | MirroredRepeatWrapping

定义纹理的垂直包裹方式,对应 UV 映射中的 _V_。

默认值为 `ClampToEdgeWrapping`。

### .DEFAULT_ANISOTROPY : number

所有纹理的默认各向异性取值。

默认值为 `1`。

### .DEFAULT_IMAGE : Image

所有纹理的默认图像。

默认值为 `null`。

### .DEFAULT_MAPPING : number

所有纹理的默认映射方式。

默认值为 `UVMapping`。

## 方法

### .clone() : Texture

返回一个复制了该实例取值的新纹理。

**返回值:** 该实例的克隆。

### .copy( source : Texture ) : Texture

将给定纹理的取值复制到该实例。

**source**

要复制的纹理。

**返回值:** 该实例的引用。

### .dispose()

释放该实例分配的 GPU 相关资源。当应用中不再使用该实例时,应调用此方法。

**触发事件:**

*   [Texture#event:dispose](Texture.html#event:dispose)

### .setValues( values : Object )

基于 `values` 设置该纹理的属性。

**values**

包含纹理参数的容器。

### .toJSON( meta : Object | string ) : Object

将纹理序列化为 JSON。

**meta**

可选,保存序列化元信息的值。

参见:

*   [ObjectLoader#parse](ObjectLoader.html#parse)

**返回值:** 表示序列化后纹理的 JSON 对象。

### .transformUv( uv : Vector2 ) : Vector2

用该纹理的 UV 变换矩阵变换给定的 uv 向量。

**uv**

uv 向量。

**返回值:** 变换后的 uv 向量。

### .updateMatrix()

根据 [Texture#offset](Texture.html#offset)、[Texture#repeat](Texture.html#repeat)、[Texture#rotation](Texture.html#rotation) 与 [Texture#center](Texture.html#center) 属性更新纹理变换矩阵。

## 源码

[src/textures/Texture.js](https://github.com/mrdoob/three.js/blob/master/src/textures/Texture.js)
