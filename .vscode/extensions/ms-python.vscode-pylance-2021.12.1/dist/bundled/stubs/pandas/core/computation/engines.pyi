import abc

class NumExprClobberingError(NameError): ...

class AbstractEngine(metaclass=abc.ABCMeta):
    has_neg_frac: bool = ...
    expr = ...
    aligned_axes = ...
    result_type = ...
    def __init__(self, expr) -> None: ...
    def convert(self) -> str: ...
    def evaluate(self) -> object: ...

class NumExprEngine(AbstractEngine):
    has_neg_frac: bool = ...

class PythonEngine(AbstractEngine):
    has_neg_frac: bool = ...
    def evaluate(self): ...
