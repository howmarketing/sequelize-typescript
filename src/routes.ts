import express, { Request, Response } from "express";
import { UserController as UserControllerClass } from "@controllers/UserController";

const routes = express.Router();

routes.get("/", (req: Request, res: Response) => {
  return res.status(200).jsonp({ msg: "Hello" });
});

routes.post("/teste", async (req: Request, res: Response) => {
  try {
    const UserController = new UserControllerClass();
    return executeAsyncAPIEndpointRouteCatchingErrorsAndInfinityLoope(
      req,
      res,
      UserController.store
    );
  } catch (e: any) {
    return res.jsonp({
      success: false,
      msg: `API RESPONSE ERROR: ${e.message}`,
    });
  }
});

// Retrive user list with they associated models (techs and users_phone_numbers).
routes.get("/api/users/list", async (req: Request, res: Response) => {
  try {
    const UserController = new UserControllerClass();
    return await executeAsyncAPIEndpointRouteCatchingErrorsAndInfinityLoope(
      req,
      res,
      UserController.getUsers
    );
  } catch (e) {
    console.log(`Route ${req?.path || "/api/unknow"} Error:`, e);
    return res.status(500).jsonp({ success: false, msg: e.message });
  }
});

// Create an user
routes.post("/api/user/create", async (req: Request, res: Response) => {
  try {
    const UserController = new UserControllerClass();
    return await executeAsyncAPIEndpointRouteCatchingErrorsAndInfinityLoope(
      req,
      res,
      UserController.store
    );
  } catch (e) {
    console.log(`Route ${req?.path || "/api/unknow"} Error:`, e);
    return res.status(500).jsonp({ success: false, msg: e.message });
  }
});

// Add some existent tech from techs table to user by user_id param
routes.post(
  "/api/user/:user_id/add/tech",
  async (req: Request, res: Response) => {
    try {
      const UserController = new UserControllerClass();
      return await executeAsyncAPIEndpointRouteCatchingErrorsAndInfinityLoope(
        req,
        res,
        UserController.addTech
      );
    } catch (e) {
      console.log(`Route ${req?.path || "/api/unknow"} Error:`, e);
      return res.status(500).jsonp({ success: false, msg: e.message });
    }
  }
);

// Retrive all users and yours associated techs, and could filter associated techs by query tech_name key-name with a keyword valu as tech name
routes.get("/api/users/techs/list", async (req: Request, res: Response) => {
  try {
    const UserController = new UserControllerClass();
    return await executeAsyncAPIEndpointRouteCatchingErrorsAndInfinityLoope(
      req,
      res,
      UserController.getTechs
    );
  } catch (e) {
    console.log(`Route ${req?.path || "/api/unknow"} Error:`, e);
    return res.status(500).jsonp({ success: false, msg: e.message });
  }
});

// Retrive all associated techs from user by user_id param, and could filter associated techs by query tech_name key-name with a keyword valu as tech name
routes.get(
  "/api/user/:user_id/techs/list",
  async (req: Request, res: Response) => {
    try {
      const UserController = new UserControllerClass();
      return await executeAsyncAPIEndpointRouteCatchingErrorsAndInfinityLoope(
        req,
        res,
        UserController.getTechs
      );
    } catch (e) {
      console.log(`Route ${req?.path || "/api/unknow"} Error:`, e);
      return res.status(500).jsonp({ success: false, msg: e.message });
    }
  }
);

/**
 * @description Função responsável por executar uma rota API com os padrões de segurança e comunicação diante erros
 * @description Função recebe os parâmetros de req e res respectivamente sobre request e response da comunicação HTTP(S)
 *  Acrescentado o parâmetros RequestHandler sendo a função controller a ser executada pela rota requisetada.
 * @description De responsabilidade de execução, será executada a função passada por parâmetro RequestHandler de forma async
 *  transportando os parâmetros req e res respectivos ao request e response da comunicação HTTP(S)
 * @returns
 */
async function executeAsyncAPIEndpointRouteCatchingErrorsAndInfinityLoope(
  req: Request,
  res: Response,
  RequestHandler: (
    req: Request,
    res: Response
  ) => Promise<{ success?: boolean; msg?: string } & Record<string, any>>
) {
  const path = req.path;
  const requestBodyData = req?.body || {};
  let responsePromise: { success: boolean; msg: string; data: any } = {
    success: false,
    msg: "Waiting for a promise response message. If u did get this message, something could be wrong here.",
    data: {},
  };
  try {
    try {
      responsePromise = await (async (): Promise<{
        success: boolean;
        msg: string;
        data: any;
      }> => {
        return new Promise<{ success: boolean; msg: string; data: any }>(
          (resolve, reject) => {
            const responseTimeOut = setTimeout(() => {
              resolve({
                success: false,
                msg: "Response time out for create user endpoint.",
                data: {},
              });
            }, 8000);
            try {
              RequestHandler(req, res).then((RequestHandlerResponse) => {
                clearTimeout(responseTimeOut);
                resolve({
                  success: true,
                  msg: "Response recived.",
                  data: RequestHandlerResponse,
                });
              });
            } catch (e: any) {
              clearTimeout(responseTimeOut);
              const errorMessage =
                e?.message ||
                "unknow message from executed controller function.";
              console.log(
                "Execute API resquest handler controller function error: ",
                e
              );
              resolve({
                success: false,
                msg:
                  "Execute API resquest handler controller function error: " +
                  errorMessage,
                data: {},
              });
            }
          }
        );
      })();
    } catch (e: any) {
      const syntaxErrorMessage =
        "Syntax promise executer API request handler error: ";
      console.log(syntaxErrorMessage, e);
      throw new Error(syntaxErrorMessage);
    }

    if (process?.env?.ENV_MOD === "DEV") {
      console.log("Route API -> responsePromise: ", responsePromise);
    }
    if (responsePromise?.success === false) {
      throw new Error(responsePromise?.msg || "Unknow response message error");
    }
    return res
      .status(responsePromise.success ? 200 : 500)
      .jsonp(responsePromise);
  } catch (e: any) {
    console.log(path + "?endpoint:error ", e);
    return res
      .status(500)
      .jsonp({ success: false, msg: e.message, request_data: requestBodyData });
  }
}
export default routes;
