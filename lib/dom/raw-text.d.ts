import { NodeType } from '../dom';
import TextNode from './text-node';
export default class RawText<T, O> extends TextNode<T, O> {
    readonly type: NodeType;
}