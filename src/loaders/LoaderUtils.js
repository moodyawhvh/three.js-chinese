/**
 * 加载器工具类:提供与资源加载相关的通用静态工具函数。
 *
 * A class with loader utility functions.
 */
class LoaderUtils {

	/**
	 * 从给定 URL 中提取基础路径(base URL)。
	 * 即截取最后一个 '/' 之前的部分(含 '/'),用作相对路径的根。
	 *
	 * Extracts the base URL from the given URL.
	 *
	 * @param {string} url -要从中提取基础路径的 URL。/ The URL to extract the base URL from.
	 * @return {string} 提取出的基础路径;若无 '/' 则返回 './'。/ The extracted base URL.
	 */
	static extractUrlBase( url ) {

		const index = url.lastIndexOf( '/' );

		if ( index === - 1 ) return './';

		return url.slice( 0, index + 1 );

	}

	/**
	 * 相对给定的基础路径解析相对 URL。
	 * 绝对路径(http(s):// 或 // 开头)、data URI 与 blob URL 原样返回;
	 * 无效的 URL 返回空字符串。
	 *
	 * Resolves relative URLs against the given path. Absolute paths, data urls,
	 * and blob URLs will be returned as is. Invalid URLs will return an empty
	 * string.
	 *
	 * @param {string} url -要解析的 URL。/ The URL to resolve.
	 * @param {string} path -作为相对 URL 解析基准的基础路径。/ The base path for relative URLs to be resolved against.
	 * @return {string} 解析后的 URL。/ The resolved URL.
	 */
	static resolveURL( url, path ) {

		// 无效 URL(非字符串或空串),直接返回空字符串
		// Invalid URL
		if ( typeof url !== 'string' || url === '' ) return '';

		// 协议相对路径:当 base path 是 http(s) 地址而 url 以 '/' 开头时,
		// 只保留协议与主机名部分,再拼接 url(主机相对 URL)
		// Host Relative URL
		if ( /^https?:\/\//i.test( path ) && /^\//.test( url ) ) {

			path = path.replace( /(^https?:\/\/[^\/]+).*/i, '$1' );

		}

		// 绝对 URL:http://、https:// 或协议相对的 // 开头,原样返回
		// Absolute URL http://,https://,//
		if ( /^(https?:)?\/\//i.test( url ) ) return url;

		// data URI(内联数据),原样返回
		// Data URI
		if ( /^data:.*,.*$/i.test( url ) ) return url;

		// blob URL,原样返回
		// Blob URL
		if ( /^blob:.*$/i.test( url ) ) return url;

		// 相对 URL:直接拼接在基础路径之后
		// Relative URL
		return path + url;

	}

}

export { LoaderUtils };
