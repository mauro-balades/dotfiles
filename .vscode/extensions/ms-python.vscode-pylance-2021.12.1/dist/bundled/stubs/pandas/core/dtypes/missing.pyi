import numpy as np
from typing import Any, Union, overload
from pandas._typing import Series, Index, ArrayLike
from pandas.core.frame import DataFrame
isposinf_scalar = ...
isneginf_scalar = ...

@overload
def isna(obj: DataFrame) -> DataFrame: ...
@overload
def isna(obj: Series) -> Series[bool]: ...
@overload
def isna(obj: Union[Index, ArrayLike]) -> np.ndarray: ...
@overload
def isna(obj: Any) -> bool: ...

isnull = isna

def notna(obj): ...
notnull = notna

def array_equivalent(left, right, strict_nan: bool=...) -> bool: ...
def na_value_for_dtype(dtype, compat: bool=...): ...
def remove_na_arraylike(arr): ...
def is_valid_nat_for_dtype(obj, dtype) -> bool: ...
