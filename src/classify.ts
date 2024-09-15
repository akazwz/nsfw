import * as tf from '@tensorflow/tfjs-node';
import * as nsfw from 'nsfwjs';

export async function classify(data: Uint8Array)  {
    const model = await nsfw.load("file://model/",{size: 299});
    tf.enableProdMode()
    const image = tf.node.decodeImage(data, 3) as tf.Tensor3D;
    const predictions = await model.classify(image);
    image.dispose();
    return predictions
}