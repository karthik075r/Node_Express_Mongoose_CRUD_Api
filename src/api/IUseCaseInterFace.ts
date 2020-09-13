interface UseCaseInterface {
    validate():any;
    execute():any;
    executeAndHandleErrors():any;
  }
  export default UseCaseInterface;