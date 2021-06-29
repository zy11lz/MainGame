
/**
 * http 服务的接口
 */
class EnumHttpApi
{
    /**
     *
     * 公告接口/client/bulletin
     *
     * @see https://q1doc.yuque.com/tyb6cm/dtgueb/cqcoo2
     *
     * 示例请求：
     * http://api-2122.kairong5.com/client/bulletin?plat_type=2122020
     *
     */
    static bulletin: string = "/client/bulletin";

    /**
     * 帐号登陆接口/client/login
     *
     * @see https://q1doc.yuque.com/tyb6cm/dtgueb/pxpys4
     */
    static login: string = "/client/login";

    /**
     * 查询游戏服接口/client/query-server
     * @see https://q1doc.yuque.com/tyb6cm/dtgueb/oda3wg
     *
     * 示例请求：
     * http://api-2122.kairong5.com/client/query-server?server_id=1001
     */
    static query_server = "/client/query-server";

    /**
     * 查询角色信息接口/client/query-player
     * @see https://q1doc.yuque.com/tyb6cm/dtgueb/qdcxti
     *
     */
    static query_player = "/client/query-player"

    /**
     * 查询历史登陆服务器接口/client/query-last-server
     * @see https://q1doc.yuque.com/tyb6cm/dtgueb/sizkn9
     */
    static query_last_server = "/client/query-last-server";

    /**
     * 区服列表接口/client/server-list
     * @see https://q1doc.yuque.com/tyb6cm/dtgueb/qalg3z
     *
     * 示例请求：
     * http://api-2122.kairong5.com/client/server-list?plat_type=2122020
     *
     */
    static server_list = "/client/server-list"

    /**
     * 测试帐号注册接口/client/test-register
     * @see https://q1doc.yuque.com/tyb6cm/dtgueb/hmcgc9
     *
     * 示例请求：
     *  http://api-2122.kairong5.com/client/test-register?account=test1001&password=111111
     */
    static test_register = "/client/test-register";

}