import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.nio.file.Path;
import java.nio.file.Paths;


class binary{
    public static void main(String[] args) {
        try{
            Path path = Paths.get("./some.txt");
            byte[] buffer = java.nio.file.Files.readAllBytes(path);
            int bytes= 0;
            String[] testCases = {"frida","hook"};
            while(bytes < buffer.length){
                if((int)buffer[bytes] == (int)testCases[0].charAt(0) || (int)buffer[bytes] == (int)testCases[1].charAt(0)){
                    for(int i=0; i<testCases[0].length();i++){
                        int Name  = RandomNumberGenerator();
                        byte bits = (byte) Name;
                        buffer[bytes] = bits;
                        bytes++;
                    }
                    
                }
                else{
                    bytes++;
                }
            };
            File targetFile = new File("./some.txt");
            OutputStream outputFile = new FileOutputStream(targetFile);
            outputFile.write(buffer);
            outputFile.close();
            
        }
        catch(IOException e){
            e.printStackTrace();
        }
    }
    public static int RandomNumberGenerator(){
        int MAX = 122;
        int MIN = 97;
        int Character = (int) (Math.random()*(MAX-MIN+1)+MIN);
        return Character;
    }
}